# This file contains functions that will take a dictionary with certain data fields, do some calculations, and return
# the new value to send to the database.

from textblob import TextBlob
from rake_nltk import Rake

class Processor:

    def __init__(self):
        self.r = Rake()

    def emoji(self, value, runningAvg, entryCount):

        """ This function processes an emoji input.

            Parameters:
            value (int): The value to be added to the new average
            runningAvg (float): The running average of existing entries in the database
            entryCount (int): The number of entries that already exist in the database

            Returns:
            float:New average value to replace the old average
        """

        return ((runningAvg * entryCount) + value)/(entryCount+1)

    def textSentiment(self, text):
        """ This function take a string of text as input, and retrieves the sentiment of the text.

            Parameters:
            text (String): The text for which the sentiment will be analysed.

            Returns:
            float: Sentiment of the text
        """

        toAnalyse = TextBlob(text)
        return toAnalyse.sentiment.polarity

    def textKeyPhrases(self, text):
        """ This function extracts all of the important words/phrases from the passed text.

            Parameters:
            text (String): The text for which the key word/phrases will be extracted.

            Returns:
            list: List of important words/phrases
        """

        extracted = list()

        toAnalyse = TextBlob(text)

        # Correct spelling mistakes
        toAnalyse.correct()

        # Extract key phrases
        self.r.extract_keywords_from_text(text)

        # Take all adjectives from the text to ensure they are definitely included in key phrases
        for tag in toAnalyse.tags:
            if ((tag[1] == 'JJ') & (len(tag[0]) >= 3)):
                extracted.append(tag[0].lemmatize())

        # Remove all duplicates
        return list(set(extracted) | (set(self.r.get_ranked_phrases()) - set(extracted)))