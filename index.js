const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
// ici on choisit de sélectionner tous nos input de type texte ou password, on les enregistre dans une constance.

const progressBar = document.getElementById('progress-bar'); // ici on sélectionne la progress bar avec id HTML
let pseudo, email, password, confirmPass;
const form = document.querySelector('form');

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container"); // la le tag permet de choisir l'élément pointé
    const span = document.querySelector("." + tag + "-container > span"); // on met toute la logique ici

    if (!valid) {
        container.classList.add('error');
        span.textContent = message;
    } else {
        container.classList.remove('error');
        span.textContent = "";
    }
};

const pseudoChecker = (value) => {

    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractères spéciaux")
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true)
        pseudo = value;
        console.log(pseudo)
    }
};
const emailChecker = (value) => {
    if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true)
        email = value;
    }
};

const passwordChecker = (value) => {

    progressBar.classList = "";

    if (
        !value.match(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
    ) { //Regex à changer
        errorDisplay("password", "Minimum de 8 caracères, une lettre, un nombre, un caractère spécial");
        progressBar.classList.add('progressRed');
        password = null;
    } else if (value.length < 12) {
        progressBar.classList.add('progressBlue');
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add('progressGreen');
        errorDisplay("password", "", true);
        password = value;
    }
    if(confirmPass)confirmChecker(confirmPass); // si jamais quelque chose est écrit dans confirm pass : relance le confirm checker
};
const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passes ne sont pas identiques");
        confirmPass = false;
    } else {
        errorDisplay('confirm', '', true);
        confirmPass = true;
    }
};


inputs.forEach((input) => {
    input.addEventListener('input', (e) => { // on crée des eventlistener pour tous les inputs.
        switch (e.target.id) { // test la valeur de E.target, ensuite on joue la fonction correspondante.
            case "pseudo" :
                pseudoChecker(e.target.value)
                break;
            case "email":
                emailChecker(e.target.value)
                break
            case "password":
                passwordChecker(e.target.value)
                break
            case "confirm":
                confirmChecker(e.target.value)
                break;
            default:
                nul;
        }
    });
});

form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if (pseudo && email && password && confirmPass){
            const data = { // on regroupe tout dans un objet
                pseudo : pseudo,
                email : email,
                password : password,
            };

            console.log(data);

            inputs.forEach((input) => (input.value = ""));
            progressBar.classList= "";

            pseudo = null;
            email = null;
            password = null;
            confirmPass = null;
            alert('Inscription validée');

        }else{
            alert('Veuillez remplir tous les champs')
        }
    }
);