# Data Analysis

- [Data Analysis](#data-analysis)
  - [Setup](#setup)
  - [Functionality](#functionality)
    - [runningAvg](#runningavg)
    - [textSentiment](#textsentiment)
    - [textAdjectives](#textadjectives)
    - [textKeyPhrases](#textkeyphrases)
    - [timeSeries](#timeseries)
    - [getIntervalTime](#getintervaltime)

## Setup

1. Run `pipenv shell` to go into the python virtual environment.
2. Run `pipenv install` to install all dependencies.
3. You may need to run `python3 -m textblob.download_corpora` if it is the first time you have used this code.
4. Now use `python3 <filename>` to run python files and it will use the virtual environment version.
5. To leave the environment run `exit`.

**To install packages, ensure you are in the environment by using `pipenv shell` and use `pipenv install <packageName>` to install any packages and these will be added to the environment data automatically.**

<!-- For RAKE
pip install rake-nltk

(If you would rather use github)
git clone https://github.com/csurfer/rake-nltk.git
python rake-nltk/setup.py install

(If you get stopwords error)
python -c "import nltk; nltk.download('stopwords')"


For TextBlob
pip install -U textblob
python -m textblob.download_corpora

(If you would rather use github)
git clone https://github.com/sloria/TextBlob.git -->

## Functionality

### runningAvg

This function processes an emoji input.

    Parameters:
    value (int): The value to be added to the new average
    runningAvg (float): The running average of existing entries in the database
    entryCount (int): The number of entries that already exist in the database

    Returns:
    float:New average value to replace the old average

### textSentiment

This function take a string of text as input, and retrieves the sentiment of the text.

    Parameters:
    text (String): The text for which the sentiment will be analysed.

    Returns:
    float: Sentiment of the text

### textAdjectives

This function extracts all of the adjectives from the passed text. As well as a key indicating statement sentiment.

    Parameters:
    text (String): The text for which the adjectives will be extracted.

    Returns:
    list: List of adjectives.
    int: Key indicating statement polarity.

### textKeyPhrases

This function extracts all of the important phrases from the passed text.

    Parameters:
    text (String): The text for which the key phrases will be extracted.

    Returns:
    list: List of important phrases

### timeSeries

This function calculates and modifies the average of an interval in the time series data
with a new value submitted by the user. This can be used for all fields that have some
sort of average as a number.

    Parameters:
    value (Float): The value to add to the element.
    timeSeriesData (dict): Dictionary of the average value for each interval with the number of entires.
    interval (Float): Length of interval in seconds.
    start_time (Javascript Time): Start time of the event.

    Returns:
    dict: Modified time series data.

### getIntervalTime

This function calculates the interval a certain time should be in using the length of the
intervals and the start time. This is returned as the start time of this interval.

    Parameters:
    start_time (Time): The start time of the event.
    current_time (Time): The current time.
    interval (Float): The length of the interval in seconds.

    Returns:
    time: The start time of the interval
