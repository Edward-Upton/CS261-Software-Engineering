# This file contains functions that will take a dictionary with certain data fields, do some calculations, and return
# the new value to send to the database.

from textblob import TextBlob
from textblob.np_extractors import ConllExtractor
from rake_nltk import Metric, Rake

class Processor:

    def __init__(self):
        self.r = Rake(ranking_metric=Metric.DEGREE_TO_FREQUENCY_RATIO, min_length=2)

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

    def textAdjectives(self, text):
        """ This function extracts all of the adjectives from the passed text. As well as a key indicating statement sentiment.

            Parameters:
            text (String): The text for which the adjectives will be extracted.

            Returns:
            list: List of adjectives.
            int: Key indicating statement polarity.
        """

        extracted = list()

        toAnalyse = TextBlob(text, np_extractor=ConllExtractor())

        # Take all adjectives from the text
        for tag in toAnalyse.tags:
            if ((tag[1] == 'JJ') & (len(tag[0]) >= 3)):
                extracted.append(tag[0].lemmatize())

        return extracted, 1 if toAnalyse.sentiment.polarity >= 0 else -1

    def textKeyPhrases(self, text):
        """ This function extracts all of the important phrases from the passed text.

            Parameters:
            text (String): The text for which the key phrases will be extracted.

            Returns:
            list: List of important phrases
        """

        self.r.extract_keywords_from_text(text)

        # Don't return more than 5 elements
        return self.r.get_ranked_phrases()[:5]