from process import Processor
import unittest

class TestProcessorMethods(unittest.TestCase):
    # Running average tests
    def test_emoji_decreaseAvg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(2, 5, 100), 502/101)
    
    def test_emoji_increaseAvg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(5, 1, 500), 505/501)

    def test_emoji_sameAvg(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(3, 3, 1000), 3)

    def test_emoji_firstElement(self):
        processor = Processor()
        self.assertEqual(processor.runningAvg(2, 0, 0), 2)


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
    def test_index_ahead(self):
        processor = Processor()
        self.assertEqual(processor.getIntervalIndex("11:00:00", "11:22:47", 300), 4)

    def test_index_before(self):
        processor = Processor()
        self.assertEqual(processor.getIntervalIndex("11:00:00", "9:45:00", 600), 136)

    def test_index_same(self):
        processor = Processor()
        self.assertEqual(processor.getIntervalIndex("11:00:00", "11:00:00", 60), 0)

    def test_index_unsafe_interval(self):
        processor = Processor()
        self.assertEqual(processor.getIntervalIndex("11:00:00", "11:22:47", 0), -1)

if __name__ == '__main__':
    unittest.main()