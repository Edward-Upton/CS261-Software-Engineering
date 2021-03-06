from process import Processor
import unittest

from datetime import datetime

class TestProcessorMethods(unittest.TestCase):
    # Running average tests
    def test_avg_decrease_avg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(2, 5, 100), 502/101)
    
    def test_avg_increase_avg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(5, 1, 500), 505/501)

    def test_avg_same_avg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(3, 3, 1000), 3)

    def test_avg_first_element(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(2, 0, 0), 2)

    def test_avg_unsafe_count(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(5, 3, -10), 3)


    # Sentiment tests
    def test_sentiment_positive(self):
        processor = Processor()
        self.assertGreaterEqual(processor.textSentiment("This workshop was incredible."), 0.5)

    def test_sentiment_negative(self):
        processor = Processor()
        self.assertLessEqual(processor.textSentiment("This project was the worst."), -0.5)

    def test_sentiment_neutral(self):
        processor = Processor()
        self.assertEqual(round(processor.textSentiment("This event was okay.")), 0)

    def test_sentiment_empty(self):
        processor = Processor()
        self.assertEqual(round(processor.textSentiment("")), 0)


    # Adjective tests
    def test_adjectives1(self):
        processor = Processor()
        self.assertTrue("cheerful" in processor.textAdjectives("The host was cheerful.")[0])

    def test_adjectives2(self):
        processor = Processor()
        self.assertTrue("interesting" in processor.textAdjectives("I found this project to be very interesting.")[0])

    def test_adjective_sentiment1(self):
        processor = Processor()
        self.assertEqual(processor.textAdjectives("This was a great experience.")[1], 1)

    def test_adjective_sentiment1(self):
        processor = Processor()
        self.assertEqual(processor.textAdjectives("This was a horrific project.")[1], -1)


    # Key phrase tests
    def test_keyphrases1(self):
        processor = Processor()
        self.assertTrue("technical issues" in processor.textKeyPhrases("The host had lots of technical issues."))

    def test_keyphrases2(self):
        processor = Processor()
        self.assertTrue("great event" in processor.textKeyPhrases("This was a great event."))

    def test_keyphrases3(self):
        processor = Processor()
        self.assertTrue("boring workshop" in processor.textKeyPhrases("This was an boring workshop."))


    # Index test
    def test_time_1(self):
        processor = Processor()
        start = datetime(2000, 12, 12, 11, 00, 00)
        current = datetime(2000, 12, 12, 11, 22, 47)
        self.assertEqual(processor.getIntervalTime(start, current, 30), datetime(2000, 12, 12, 11, 22, 30))

    def test_time_2(self):
        processor = Processor()
        start = datetime(2000, 12, 11, 11, 11, 00)
        current = datetime(2000, 12, 12, 11, 00, 47)
        self.assertEqual(processor.getIntervalTime(start, current, 150), datetime(2000, 12, 12, 10, 58, 30))

    def test_time_same(self):
        processor = Processor()
        start = datetime(2000, 12, 11, 11, 11, 11)
        current = datetime(2000, 12, 11, 11, 11, 11)
        self.assertEqual(processor.getIntervalTime(start, current, 10), start)


if __name__ == '__main__':
    unittest.main()