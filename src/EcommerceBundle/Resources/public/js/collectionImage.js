$(document).ready(function () {
    // On r�cup�re la balise <div> en question qui contient l'attribut � data-prototype � qui nous int�resse.
    var $container = $('div#ecommercebundle_product_images');

    // On d�finit un compteur unique pour nommer les champs qu'on va ajouter dynamiquement
    var index = $container.find(':input').length;

    // On ajoute un nouveau champ � chaque clic sur le lien d'ajout.
    $('#add_image').click(function (e) {
        addMedia($container);

        e.preventDefault(); // �vite qu'un # apparaisse dans l'URL
        return false;
    });

    // On ajoute un premier champ automatiquement s'il n'en existe pas d�j� un (cas d'une nouvelle annonce par exemple).
    if (index == 0) {
        addMedia($container);
    } else {
        // S'il existe d�j� des images, on ajoute un lien de suppression pour chacune d'entre elles
        $container.children('div').each(function () {
            addDeleteLink($(this));
        });
    }

    // La fonction qui ajoute un formulaire MediaType
    function addMedia($container) {
        // Dans le contenu de l'attribut � data-prototype �, on remplace :
        // - le texte "__name__label__" qu'il contient par le label du champ
        // - le texte "__name__" qu'il contient par le num�ro du champ
        var template = $container.attr('data-prototype')
                .replace(/__name__label__/g, 'image n�' + (index + 1))
                .replace(/__name__/g, index)
            ;

        // On cr�e un objet jquery qui contient ce template
        var $prototype = $(template);

        // On ajoute au prototype un lien pour pouvoir supprimer l'image
        addDeleteLink($prototype);

        // On ajoute le prototype modifi� � la fin de la balise <div>
        $container.append($prototype);

        // Enfin, on incr�mente le compteur pour que le prochain ajout se fasse avec un autre num�ro
        index++;
    }

    // La fonction qui ajoute un lien de suppression d'image
    function addDeleteLink($prototype) {
        // Cr�ation du lien
        var $deleteLink = $('<a href="#" class="btn btn-danger">Supprimer</a>');

        // Ajout du lien
        $prototype.append($deleteLink);

        // Ajout du listener sur le clic du lien pour effectivement supprimer limage
        $deleteLink.click(function (e) {
            $prototype.remove();

            e.preventDefault(); // �vite qu'un # apparaisse dans l'URL
            return false;
        });
    }
});