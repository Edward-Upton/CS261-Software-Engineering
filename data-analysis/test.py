from process import Processor
import unittest

class TestProcessorMethods(unittest.TestCase):
    def test_emoji_decreaseAvg(self):
        processor = Processor()
        self.assertEqual(processor.emoji(2, 5, 100), 502/101)
    
    def test_emoji_increaseAvg(self):
        processor = Processor()
        self.assertEqual(processor.emoji(5, 1, 500), 505/501)

    def test_emoji_sameAvg(self):
        processor = Processor()
        self.assertEqual(processor.emoji(3, 3, 1000), 3)

    def test_sentiment_positive(self):
        processor = Processor()
        self.assertGreaterEqual(processor.textSentiment("This workshop was incredible."), 0.5)

    def test_sentiment_negative(self):
        processor = Processor()
        self.assertLessEqual(processor.textSentiment("This project was the worst."), -0.5)

    def test_sentiment_neutral(self):
        processor = Processor()
        self.assertEqual(round(processor.textSentiment("This event was okay.")), 0)

    def test_keyword_adjectives(self):
        processor = Processor()
        self.assertTrue("boring" in processor.textKeyPhrases("This host was boring."))

    def test_duplicate_adjectives(self):
        processor = Processor()
        self.assertEqual(processor.textKeyPhrases("The host was positive, and the overall event was positive.").count("positive"), 1)

if __name__ == '__main__':
    unittest.main()