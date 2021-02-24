# This file contains functions that will take a dictionary with certain data fields, do some calculations, and return
# the new value to send to the database.

from textblob import TextBlob
from rake_nltk import Metric, Rake
from datetime import datetime

class Processor:

    def __init__(self):
        self.r = Rake(ranking_metric=Metric.DEGREE_TO_FREQUENCY_RATIO, min_length=2)

    def runningAvg(self, value, runningAvg, entryCount):

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

        toAnalyse = TextBlob(text)

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

    def slider(self, value, currVals, interval, intervalCount, start_time):
        """ This function calculates the running average for a specific element of the passed array, based on 
            the interval length and times, used for the slider.

            Parameters:
            value (Float): The value to add to the element.
            currVals (list): List of current values for the plot.
            interval (Float): Length of interval in seconds.
            intervalCount (Float): The number of elements in the current interval.
            start_time (Time, %H:%M:%S): The start time of the event.

            Returns:
            list: List of elements with the correctly modified value.
            int: Number of elements in current interval.
        """

        now = datetime.now()

        # Get current time
        current_time = now.strftime("%H:%M:%S")

        indexToModify = self.getIntervalIndex(start_time, current_time, interval)

        # If index is higher than the current interval lengths, start a new interval entry and reset the interval count
        if (indexToModify >= len(currVals)):
            intervalCount = 0

        # Add entries to currVals until sufficient for the index
        while (indexToModify >= len(currVals)):
            currVals.append(0)

        # Update the value
        currVals[indexToModify] = round(self.runningAvg(value, currVals[indexToModify], intervalCount), 3)

        # Return new values, and the incremented interval count
        return intervalCount+=1, currVals

    def getIntervalIndex(self, start_time, current_time, interval):
        """ This function calculates the running average for a specific element of the passed array, based on 
            the interval length and times, used for the slider.

            Parameters:
            start_time (Time): The start time of the event.
            current_time (Time): The current time.
            interval (Float): The length of the interval in seconds.

            Returns:
            float: The index to modify.
        """

        # Prevents division by 0
        if (interval == 0):
            return -1

        index = 0
        
        # Get time difference
        FMT = '%H:%M:%S'
        tdelta = datetime.strptime(current_time, FMT) - datetime.strptime(start_time, FMT)

        # Calculate interval index
        index = (tdelta.seconds - (tdelta.seconds%interval))/interval

        return int(index)



if __name__ == '__main__':
    processor = Processor()

    # mylist = [1, 3, 4, 5, 0]

    # interval = 300 # 5 Minutes

    # print(processor.slider(5, mylist, interval, 10, "11:00:00"))

    statement1 = "The host was cheerful, but the content was delivered very slowly. A great host, but a very boring lecture!"
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