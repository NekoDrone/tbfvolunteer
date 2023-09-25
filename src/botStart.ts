import sendMessageToUserId from "./telegram/sendMessageToUserId";
import generateCaseList from "./jira/generateCaseList";
import editMessageWithInlineButtons from "./telegram/editMessageWithInlineButtons";
import { AuthUser } from "./exports/types";
import updateSessionMessageId from "./firestore/docupdates/updateSessionMessageId";

/**
 * Starts the bot and performs all necessary operations for the given user.
 * @param userDoc - The authorised user's state data as an AuthUser object.
 */
export default async function botStart(userDoc: AuthUser): Promise<void> {
    const botIsStartingMessage = "Befriending CMS Bot 2.0 Loading...";
    const messageId = await sendMessageToUserId(botIsStartingMessage, userDoc.telegramId);
    updateSessionMessageId(userDoc.telegramId, messageId);
    const casesList = await generateCaseList(userDoc.jiraLabel);
    const message = `Hello ${userDoc.name}! Please choose a case from the list below:`;
    editMessageWithInlineButtons(userDoc, casesList, message);
}
