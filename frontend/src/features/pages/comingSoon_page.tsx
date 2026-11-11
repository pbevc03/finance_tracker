import "../../styles/comingSoon.css"

type ComingSoonPageProps = {
  title: string;
};

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <section className="coming-soon-page">
      <div className="coming-soon-card">
        <div className="coming-soon-icon" aria-hidden="true">
          ✦
        </div>

        <p className="coming-soon-label">{title}</p>
        <h1>Kmalu na voljo</h1>
        <p className="coming-soon-description">
          To stran še pripravljamo. Kmalu boš lahko tukaj upravljal svoje
          finance na enem mestu.
        </p>

        <span className="coming-soon-badge">V pripravi</span>
      </div>
    </section>
  );
}