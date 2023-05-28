import React from "react";
import styles from "../../../styles/sequence.module.css";

const Sequence1 = () => {
    return (
        <>
            <link href='https://unpkg.com/css.gg@2.0.0/icons/css/arrow-left.css' rel='stylesheet'></link>
            <header>
                <button className={styles.go_back}><a className={styles.a} href="/"><i className="gg-arrow-left"></i></a></button>
                <h1 className={styles.title}>Séquence 1 : L'Homme et l'animal</h1>
                <h2 className={styles.subtitle}>Consigne : Lisez la fable de Phèdre, <i>La Fourmi et la Mouche</i>, et celle de la Fontaine <i>La Cigale et la Fourmi</i>. Quelle représentation de cet insecte proposent-elles ? Comparez textes antiques et texte du XVII<sup>e</sup> siècle.</h2>
            </header>
            <main>
                <p>Les textes de La Fontaine et de Phèdre <i>La Cigale et la Fourmi</i> et <i> La Fourmi et la Mouche</i> se ressemblent fortement. En effet La Fontaine s’est inspiré de Phèdre pour écrire sa fable.</p>
                <p>Les deux textes renvoient une image semblable et favorable de la fourmi, en effet, elle apparaît comme économe car elle possède des réserves « je rentre saine et sauve dans ma demeure, où est l'abondance » dans le texte de Phèdre et travailleuse car elle as des grains qu’elle a récolté pendant l’été pour se nourrir lorsque l’hiver sera là, « Tandis que j'amasse avec ardeur du grain pour mon hiver » toujours chez Phèdre. Chez La Fontaine la fourmi paraît égoïste car elle souhaite garder la nourriture qu’elle a amassé pour elle seule « La Fourmi n’est pas prêteuse » mais il annonce ensuite que c’est son seul et unique défaut « C’est là son moindre défaut».</p>
                <p>Ces exemples ci-dessus montre que la fourmi est considérée comme un modèle à la fois pour l’homme « Cette fable nous apprend à connaître deux caractères différents : l'homme qui fait parade de faux avantages, et celui dont la vertu brille d'un solide éclat » et pour les autres animaux tel que la cigale qui se voit refuser quelques provisions car elle n’as pas travaillé et qu’elle n’as fait que chanter</p>
            </main>
        </>
    )
}

export default Sequence1;