const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const toggleColors = document.getElementById("toggle-colors");
const rootStyles = document.documentElement.style;
const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");



const changeLanguage = async (language) => {
  console.log("Selected language:", language);

  try {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    const textsToChange = document.querySelectorAll("[data-section][data-value]");

    textsToChange.forEach((textToChange) => {
      const section = textToChange.dataset.section;
      const value = textToChange.dataset.value;

      textToChange.innerHTML = texts[section][value];
    });
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
};

flagsElement.addEventListener("click", (e) => {
    const selectedLanguage = e.target.parentElement.dataset.language;
    changeLanguage(selectedLanguage);
  });


flagsElement.addEventListener("click", (e) => {
    const selectedLanguage = e.target.parentElement.dataset.language;
    changeLanguage(selectedLanguage);
});

toggleTheme.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    if(toggleIcon.src.includes('moon.png')){
        toggleIcon.src='assets/icons/sun.png';
        toggleText.textContent = "Light Mode";
    } else {
        toggleIcon.src='assets/icons/moon.png';
        toggleText.textContent = "Dark Mode";
    }
});

toggleColors.addEventListener('click', (e) => {
    rootStyles.setProperty("--primary-color", e.target.dataset.color);
    
});