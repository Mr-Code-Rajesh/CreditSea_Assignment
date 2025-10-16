import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import Report from '../models/reportModel.js';

export const uploadXML = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    const xmlData = fs.readFileSync(req.file.path, 'utf-8');
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(xmlData);

    const profile = json?.INProfileResponse || {};

    // --- Extract credit summary ---
    const summary = profile?.CAIS_Account?.CAIS_Summary || {};
    const totalBalance = summary?.Total_Outstanding_Balance || {};
    const creditAccount = summary?.Credit_Account || {};

    // --- Extract applicant details ---
    const detailsList =
      profile?.CAIS_Account?.CAIS_Account_DETAILS || [];
    // Always make sure it’s an array
    const accountsArray = Array.isArray(detailsList)
      ? detailsList
      : [detailsList];

    // Pick the first valid holder with name
    const firstHolder =
      accountsArray
        .map(acc => acc?.CAIS_Holder_Details)
        .find(h => h?.First_Name_Non_Normalized || h?.Surname_Non_Normalized) || {};

    // Extract phone number & PAN from same account node
    const phoneInfo = accountsArray
      .map(acc => acc?.CAIS_Holder_Phone_Details)
      .find(p => p?.Telephone_Number) || {};
    const panInfo = firstHolder?.Income_TAX_PAN || '';

    // --- Extract credit score ---
    const score = profile?.SCORE?.BureauScore || 0;

    // --- Build report object ---
    const report = new Report({
      name: `${firstHolder?.First_Name_Non_Normalized || ''} ${firstHolder?.Surname_Non_Normalized || ''}`.trim() || 'Unknown',
      mobile: phoneInfo?.Telephone_Number || '',
      pan: panInfo || '',
      creditScore: Number(score) || 0,
      summary: {
        totalAccounts: Number(creditAccount?.CreditAccountTotal) || 0,
        activeAccounts: Number(creditAccount?.CreditAccountActive) || 0,
        closedAccounts: Number(creditAccount?.CreditAccountClosed) || 0,
        currentBalance: Number(totalBalance?.Outstanding_Balance_All) || 0,
        securedAmount: Number(totalBalance?.Outstanding_Balance_Secured) || 0,
        unsecuredAmount: Number(totalBalance?.Outstanding_Balance_UnSecured) || 0,
        enquiriesLast7Days: Number(profile?.TotalCAPS_Summary?.TotalCAPSLast7Days) || 0
      }
    });

    await report.save();
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: 'File processed successfully', report });
  } catch (error) {
    console.error('❌ Error parsing XML:', error);
    res.status(500).json({ message: 'Error processing XML file', error });
  }
};
