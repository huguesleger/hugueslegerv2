const QUERY_HOME = `
query MyQuery {
    home {
      _modelApiKey
      id
      titre
      texteEntrer
      titreEntrer
      email
      titreContact
      image {
        alt
        height
        id
        url
        width
      }
      titleLastProject
      subtitleLastProject
      lastWork {
        _modelApiKey
        id
        titre
        typeProjet
        target
        slug
        image {
          alt
          height
          id
          url
          width
        }
      }
    }
  }
  `;

const QUERY_CONTACT = `
query MyQuery {
  contact {
    id
    _modelApiKey
    titre
    titre2
    email
    image {
      alt
      height
      id
      width
      url
    }
  }
}
`;

const QUERY_SLUGS_PROJETS = `
query MyQuery {
  allProjets {
    id
    slug
  }
}
`;

const QUERY_CARD_PROJETS = `
query MyQuery {
  allProjets {
    id
    slug
    titre
    imageSlider {
      alt
      height
      id
      url
      width
    }
  }
}
`;

const QUERY_PROJET_BY_SLUG = `
query MyQuery ($slug: String){
  projet(filter: {slug: {eq: $slug}}) {
    id
    titre
    slug
    annee
    titreCharte
    descriptionCharte
    colorSection {
      hex
    }
    colorText
    codeCouleur {
      id
      _modelApiKey
      titre
      colorText
      color {
        hex
      }
    }
    imageCodeCouleur {
      id
      alt
      height
      url
      width
    }
    imageCharte {
      id
      _modelApiKey
      image {
        alt
        height
        id
        url
        width
      }
    }
    imageCharteBottom {
      id
      _modelApiKey
      image {
        alt
        height
        id
        url
        width
      }
    }
    imageSlider {
      alt
      height
      id
      url
      width
    }
    imageFull {
      alt
      height
      id
      width
      url
    }
    imagePage {
      id
      _modelApiKey
      image {
        alt
        height
        id
        url
        width
      }
    }
    colorSectionMobile {
      hex
    }
    imageTemplateMobile {
      alt
      height
      id
      url
      width
    }
    imageDevice {
      alt
      height
      id
      url
      width
    }
    imageTemplateDesktopFull {
      alt
      height
      id
      url
      width
    }
    imageTemplateDesktop {
      alt
      height
      id
      url
      width
    }
    intervention
    siteWeb
    titreKeyword
    description {
      value
    }
    texteProjet {
      value
    }
    texteSlider {
      value
    }
    imageGraphique {
      alt
      height
      id
      url
      width
    }
    imageCard {
      _modelApiKey
      id
      image {
        alt
        height
        id
        url
        width
      }
    }
    texteImageCard {
      value
    }
    pubOutside {
      alt
      height
      id
      url
      width
    }
  }
}
`;

const QUERY_ABOUT = `
query MyQuery {
  about {
    _modelApiKey
    id
    titre
    titre2
    titreBio
    iconBio
    texteBio {
      value
    }
    imageBio {
      id
      alt
      height
      width
      url
    }
    texteCircle {
      _modelApiKey
      id
      texte
    }
    titreCursus
    listeCursus {
      _modelApiKey
      id
      titre
      ecole
      annee
      image {
        id
        alt
        height
        width
        url
      }
    }
    titreCompetence {
      _modelApiKey
      id
      titre
      icon
    }
    listeCompetence {
      _modelApiKey
      id
      number
      icon
      titre
      description {
        value
      }
    }
    listeCompetenceItems {
      _modelApiKey
      id
      number
      icon
      titre
      listeServiceLeft {
        _modelApiKey
        id
        texte
      }
      listeServiceCenter {
        _modelApiKey
        id
        texte
      }
      listeServiceRight {
        _modelApiKey
        id
        texte
      }
    }
    titreContact
    emailContact
  }
}
`;

const Query = {
  QUERY_HOME,
  QUERY_CONTACT,
  QUERY_SLUGS_PROJETS,
  QUERY_CARD_PROJETS,
  QUERY_PROJET_BY_SLUG,
  QUERY_ABOUT,
};

export default Query;
