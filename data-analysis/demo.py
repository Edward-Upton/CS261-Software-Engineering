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

        return extracted, 1 if toAnalyse.sentiment.polarity >= 0 else 0

    def textKeyPhrases(self, text):
        """ This function extracts all of the important words/phrases from the passed text.

            Parameters:
            text (String): The text for which the key word/phrases will be extracted.

            Returns:
            list: List of important words/phrases
        """

        self.r.extract_keywords_from_text(text)

        return self.r.get_ranked_phrases()

if __name__ == '__main__':
    processor = Processor()

    statement1 = "The host was enthusiastic, but the content was delivered very slowly. A great host, but a very boring lecture!"
    statement2 = "I was a member of this mediocre project, sometimes it was enjoyable, but for the most part, the manager was clueless."
    statement3 = "Average, several places for improvement, the content was dull, and there was an abundance of technical issues."

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 1 (", statement1 ,"):")
    print("Sentiment: ", processor.textSentiment(statement1))
    print("Adjectives: ", processor.textAdjectives(statement1))
    print("Key phrases: ", processor.textKeyPhrases(statement1))

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 2 (", statement2 ,"):")
    print("Sentiment: ", processor.textSentiment(statement2))
    print("Adjectives: ", processor.textAdjectives(statement2))
    print("Key phrases: ", processor.textKeyPhrases(statement2))

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 3 (", statement3 ,"):")
    print("Sentiment: ", processor.textSentiment(statement3))
    print("Adjectives: ", processor.textAdjectives(statement3))
    print("Key phrases: ", processor.textKeyPhrases(statement3))

    print("")

    for i in range(0, 100):
        print("#",end='')