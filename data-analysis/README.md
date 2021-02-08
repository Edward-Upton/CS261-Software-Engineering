# Data Analysis

# Setup

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