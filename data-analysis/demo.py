# This file contains functions that will take a dictionary with certain data fields, do some calculations, and return
# the new value to send to the database.

from textblob import TextBlob

class Processor:

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

        # Take all adjectives from the text to ensure they are definitely included in key phrases
        for tag in toAnalyse.tags:
            if ((tag[1] == 'JJ') & (len(tag[0]) >= 3)):
                extracted.append(tag[0].lemmatize())

        # Remove all duplicates
        #return list(set(extracted) | (set(self.r.get_ranked_phrases()) - set(extracted)))
        return list(set(extracted) | set(toAnalyse.noun_phrases))

if __name__ == '__main__':
    processor = Processor()

    statement1 = "Great workshop, I learned a lot and there were very interesting topics."
    statement2 = "This was a pretty good project, but the host had lots of technical issues which was not good."
    statement3 = "I hated every second of this lecture, the content was uninteresting and boring and I fell asleep."

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 1 (", statement1 ,"):")
    print("Sentiment: ", processor.textSentiment(statement1))
    print("Key phrases/adjectives: ", processor.textKeyPhrases(statement1))

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 2 (", statement2 ,"):")
    print("Sentiment: ", processor.textSentiment(statement2))
    print("Key phrases/adjectives: ", processor.textKeyPhrases(statement2))

    print("")

    for i in range(0, 100):
        print("#",end='')

    print("\n")

    print("Statement 3 (", statement3 ,"):")
    print("Sentiment: ", processor.textSentiment(statement3))
    print("Key phrases/adjectives: ", processor.textKeyPhrases(statement3))

    print("")

    for i in range(0, 100):
        print("#",end='')