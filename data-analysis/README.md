For RAKE
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
git clone https://github.com/sloria/TextBlob.git