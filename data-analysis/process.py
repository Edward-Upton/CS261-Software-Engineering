# This file contains functions that will take a dictionary with certain data fields, do some calculations, and return
# the new value to send to the database.

from textblob import TextBlob
from rake_nltk import Metric, Rake
from datetime import datetime, timedelta

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

    def slider(self, value, timeSeriesData, interval, jsStartTime):
        """ This function calculates the running average for a specific element of the passed array, based on 
            the interval length and times, used for the slider.

            Parameters:
            value (Float): The value to add to the element.
            timeSeriesData (dict): Dictionary of the average value for each interval with the number of entires.
            interval (Float): Length of interval in seconds.
            intervalCount (Float): The number of elements in the current interval.
            start_time (Time, %H:%M:%S): The start time of the event.

            Returns:
            list: List of elements with the correctly modified value.
            int: Number of elements in current interval.
        """

        now = datetime.now()

        # Get current time
        current_time = now
        print(jsStartTime)
        start_time = datetime.strptime(jsStartTime, '%Y-%m-%dT%H:%M:%S.%fZ')
        print("Start Time:", start_time)
        print("Current Time:", current_time)

        intervalStartTime = self.getIntervalTime(start_time, current_time, interval)
        print("Start Time of Interval:", intervalStartTime)
        foundInterval = False
        for interval in timeSeriesData:
            print(interval["date"])
            if datetime.strptime(interval["date"], '%Y-%m-%dT%H:%M:%S.%fZ') == intervalStartTime:
                interval["value"] = round(self.runningAvg(value, interval["value"], interval["num"]), 3)
                interval["num"] += 1
                foundInterval = True
                break
        
        if not foundInterval:
            timeSeriesData.append({ "value": value, "date": intervalStartTime.isoformat(), "num": 1 })

        # Return new values, and the incremented interval count
        return timeSeriesData

    def getIntervalTime(self, start_time, current_time, interval):
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
        
        # Get time difference
        tdelta = current_time - start_time

        # Calculate interval index
        time = start_time + timedelta(seconds=((tdelta.total_seconds() // interval) * interval))
        return time
