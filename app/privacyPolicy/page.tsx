export default function PrivacyPolicy() {
  const brandName = "Gamez24";
  const contactEmail = "techmuscles55@gmail.com";
  const lastUpdated = "21 Aug 2025";
  return (
    <article className="prose prose-gray max-w-none">
      <h2 className="!mt-0 text-4xl font-bold font-modern">Privacy Policy</h2>
      <p className="text-sm text-gray-500 mt-5">Last updated: {lastUpdated}</p>

      <p>
        We respect your privacy. This website {brandName} showcases video game
        deals from third-party platforms such as Steam, Epic Games, and GOG.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        Information We Collect
      </h3>
      <ul>
        <li>
          We do <strong>not</strong> collect personal information such as names,
          email addresses, or payment details.
        </li>
        <li>
          We may collect <strong>anonymous statistics</strong> about overall
          website usage (e.g., number of visits and the countries visitors come
          from) to improve the Site. These statistics cannot identify individual
          users.
        </li>
      </ul>

      <h3 className="text-2xl font-bold font-modern mt-5">Cookies</h3>
      <p>
        This Site does <strong>not</strong> use cookies or similar tracking
        technologies at this time.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">Third-Party Links</h3>
      <p>
        The Site contains links to third-party websites (e.g., Steam, Epic
        Games, GOG). We are not responsible for the privacy practices or content
        of those external sites. We encourage you to review their respective
        privacy policies.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        Children’s Privacy
      </h3>
      <p>
        The Site is not directed to children under the age of 13. We do not
        knowingly collect personal information from children.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        Changes to This Policy
      </h3>
      <p>
        If we add features such as user accounts, personalized recommendations,
        or newsletters in the future, this Privacy Policy will be updated to
        explain how we handle personal information.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">Contact</h3>
      <p>
        If you have any questions about this Privacy Policy, you may contact us
        at{" "}
        <a className="underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        .
      </p>

      {/* <hr /> */}
      {/* <p className="text-xs text-gray-500">
        Tip: If you later introduce analytics, cookies, accounts, or
        newsletters, update this page to describe the data collected, purposes,
        legal basis (for EU users), retention, and your processor list.
      </p> */}
    </article>
  );
}
