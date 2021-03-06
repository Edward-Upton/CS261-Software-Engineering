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

        if (entryCount < 0):
            return runningAvg

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

    def timeSeries(self, value, timeSeriesData, interval, jsStartTime):
        """ This function calculates and modifies the average of an interval in the time series data 
            with a new value submitted by the user. This can be used for all fields that have some
            sort of average as a number.

            Parameters:
            value (Float): The value to add to the element.
            timeSeriesData (dict): Dictionary of the average value for each interval with the number of entires.
            interval (Float): Length of interval in seconds.
            start_time (Javascript Time): Start time of the event.

            Returns:
            dict: Modified time series data.
        """


        # Get current time
        current_time = datetime.now()

        # Get start time of event
        start_time = datetime.strptime(jsStartTime, '%Y-%m-%dT%H:%M:%S.%fZ')

        # Get the start time of the interval that this piece of data should be included in
        intervalStartTime = self.getIntervalTime(start_time, current_time, interval)

        # Attempt to find an existing interval with this interval starting time to update the average.
        foundInterval = False
        for interval in timeSeriesData:
            if datetime.strptime(interval["date"], '%Y-%m-%dT%H:%M:%S.%fZ') == intervalStartTime:
                # Found interval with matching start time, therefore update the average.
                interval["value"] = round(self.runningAvg(value, interval["value"], interval["num"]), 3)
                interval["num"] += 1
                foundInterval = True
                break
        
        # If no interval was found, add a new one with the initial value being the new value.
        if not foundInterval:
            timeSeriesData.append({ "value": value, "date": intervalStartTime.isoformat(), "num": 1 })

        # Return modified time series data
        return timeSeriesData

    def getIntervalTime(self, start_time, current_time, interval):
        """ This function calculates the interval a certain time should be in using the length of the
            intervals and the start time. This is returned as the start time of this interval

            Parameters:
            start_time (Time): The start time of the event.
            current_time (Time): The current time.
            interval (Float): The length of the interval in seconds.

            Returns:
            time: The start time of the interval
        """

        # Prevents division by 0
        if (interval == 0):
            return -1
        
        # Get time difference
        tdelta = current_time - start_time

        # Calculate interval start time
        time = start_time + timedelta(seconds=((tdelta.total_seconds() // interval) * interval))
        return time
