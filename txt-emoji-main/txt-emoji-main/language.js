const translateButton = document.getElementById('translateButton');
const clearButton = document.getElementById('clearButton');
const swapButton = document.getElementById('swapButton');
const inputText = document.getElementById('inputText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const translatedText = document.getElementById('translatedText');

translateButton.addEventListener('click', () => {
  const textToTranslate = inputText.value;
  const sourceLang = sourceLanguage.value;
  const targetLang = targetLanguage.value;

    const apiKey = 'AIzaSyBu6AjavNmuFfHA6ctYqd-RgaaM_AS5sS4';
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const requestData = {
    q: textToTranslate,
    target: targetLang,
  };

  if (sourceLang !== 'en') {
    requestData.source = sourceLang;
  }

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.data && data.data.translations && data.data.translations.length > 0) {
        const translatedTextResult = data.data.translations[0].translatedText;
        translatedText.textContent = translatedTextResult;
      } else {
        throw new Error('Translation failed.');
      }
    })
    .catch(error => {
      console.error('Translation error:', error);
      translatedText.textContent = 'Translation failed.';
    });
});

clearButton.addEventListener('click', () => {
  inputText.value = '';
  translatedText.textContent = '';
});

swapButton.addEventListener('click', () => {
  const sourceLang = sourceLanguage.value;
  sourceLanguage.value = targetLanguage.value;
  targetLanguage.value = sourceLang;
});
