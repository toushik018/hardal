import React from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | Hardal Catering',
  description: 'Impressum von Hardal Catering - Rechtliche Informationen und Kontaktdaten.',
};

// Make the page static
export const dynamic = 'force-static';

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Impress<span className="text-first">um</span>
          </h1>
          <div className="w-20 h-1 bg-first mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="prose max-w-none">
            {/* Company Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
              <p className="font-medium">
                Köz Hamburg GmbH
                <br />
                Möllner Landstraße 3<br />
                D-22111 Hamburg
              </p>

              <p className="mt-4">Geschäftsführer: Ramazan Zülfikar</p>

              <p className="mt-4">
                Tel.: <a href="tel:+4940847082" className="text-first hover:underline">+49 (040) 84 70 82 31</a>
                <br />
                Fax: +49 (040) 84 70 82 30
                <br />
                E-Mail: <a href="mailto:info@hardal-restaurant.de" className="text-first hover:underline">info@hardal-restaurant.de</a>
              </p>

              <p className="mt-4">
                Sitz der Gesellschaft: Hamburg
                <br />
                USt-IdNr.: DE314224272
                <br />
                HRB 147563
              </p>
            </div>

            <p className="mb-8">
              Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV: Ramazan Zülfikar,
              Möllner Landstraße 3, 22111 Hamburg
              <br />
              Es gelten unsere Allgemeinen Geschäftsbedingungen.
            </p>

            {/* Fotolia Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-first rounded-full"></span>
                Fotoliaangaben
              </h2>
              <div className="p-6 rounded-xl">
                <p>
                  © superelaks
                  <br />
                  © Anchalee
                  <br />
                  © Pixel-Shot
                  <br />
                  © Arkady Chubykin
                  <br />
                  © alex
                  <br />
                  © Ryzhkov
                  <br />
                  © Lukas Gojda
                  <br />© photohaydar
                </p>
              </div>
            </div>

            {/* Legal Sections */}
            <div className="space-y-8">
              
              <div>
                <h3 className="text-xl font-bold mb-4">Haftungshinweis</h3>
                {/* Legal Content Sections */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Haftungsausschluss</h4>
                    <p className="text-gray-600">
                      Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
                      für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
                      sind ausschließlich deren Betreiber verantwortlich.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Haftung für Inhalte</h4>
                    <p className="text-gray-600">
                      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
                      die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
                      jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
                      Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
                      Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                      Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                      gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                      forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                      Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                      Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                      Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
                      von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                      umgehend entfernen.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Haftung für Links</h4>
                    <p className="text-gray-600">
                      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
                      Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                      fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                      verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                      Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                      Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                      Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                      permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                      konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                      Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                      umgehend entfernen.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Urheberrecht</h4>
                    <p className="text-gray-600">
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                      Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                      Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                      Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                      jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
                      sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                      Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                      wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
                      Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
                      eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                      entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                      werden wir derartige Inhalte umgehend entfernen.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Unverbindlichkeit der Informationen
                    </h4>
                    <p className="text-gray-600">
                      Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
                      recherchiert. Gleichwohl übernimmt der Anbieter keine Haftung für die
                      Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
                      Informationen. Die Beiträge geben die Meinung des jeweiligen Autors
                      wieder.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Unverbindlichkeit von Auskünften
                    </h4>
                    <p className="text-gray-600">
                      Die Informationen, die auf dieser Website bereitgestellt werden, sind
                      allgemeiner Art und sind unverbindlich.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Kommunikation über E-Mail
                    </h4>
                    <p className="text-gray-600">
                      Eine Kommunikation via E-Mail kann Sicherheitslücken aufweisen.
                      Beispielsweise können E-Mails auf ihrem Weg an die Mitarbeiter unseres
                      Unternehmens oder an unsere Netzwerkpartner von versierten
                      Internet-Nutzern aufgehalten und eingesehen werden. Sollten wir eine
                      E-Mail von Ihnen erhalten, so gehen wir davon aus, dass wir zu einer
                      Beantwortung per E-Mail berechtigt sind. Ansonsten müssen Sie
                      ausdrücklich auf eine andere Art der Kommunikation verweisen. Eine
                      Verschlüsselung der Nachrichten mit gängigen Verschlüsselungsstandards
                      (z.B. PGP) erfolgt nur auf ausdrücklichen Wunsch nach Bestätigung.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Keine Abmahnung ohne vorherigen Kontakt:
                    </h4>
                    <p className="text-gray-600">
                      Sollte der Inhalt oder die Aufmachung dieser Seiten Rechte Dritter
                      oder gesetzliche Bestimmungen verletzen, bitten wir um eine
                      entsprechende Nachricht ohne Kostennote. Die Beseitigung einer
                      möglicherweise von diesen Seiten ausgehenden Schutzrechtsverletzung
                      von Schutzrecht-InhaberInnen selbst darf nicht ohne unsere Zustimmung
                      erfolgen. Wir garantieren, dass zu Recht beanstandete Sachverhalte
                      unverzüglich entfernt werden, ohne dass von Ihrer Seite die
                      Einschaltung eines Rechtsanwaltes o. ä. erforderlich ist. Dennoch von
                      Ihnen ohne vorherige Kontaktaufnahme ausgelöste Kosten werden wir
                      vollumfänglich zurückweisen und gegebenenfalls Gegenklage wegen
                      Verletzung vorgenannter Bestimmungen einreichen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} Köz Hamburg GmbH. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
