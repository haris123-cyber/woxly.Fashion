import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop"
          alt="Privacy Policy Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Legal Information
          </p>
          <h1 className="text-5xl md:text-7xl font-fraunces text-white mb-6 animate-slide-up">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="bg-card border border-border p-8 md:p-12 shadow-sm">
            <div className="mb-12 border-b border-border pb-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-4">Last updated: February 21, 2026</p>
              <h2 className="text-3xl font-fraunces mb-4 text-foreground">Store: Mini Mart</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mini Mart operates this store and related services. This policy explains how customer data is collected, used, stored, and shared.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Personal Information We Collect or Process</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6 marker:text-[#cfae70]">
                  <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
                  <li>Financial information including credit card, debit card, and financial account numbers, payment card information, transaction details, form of payment, payment confirmation and other payment details.</li>
                  <li>Account information including your username, password, security questions, preferences and settings.</li>
                  <li>Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                  <li>Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                  <li>Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                  <li>Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                </ul>
                <p className="mt-6 text-muted-foreground leading-relaxed">We collect information you provide directly, such as name, email, shipping address, and payment details when you make a purchase.</p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Personal Information Sources</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6 marker:text-[#cfae70]">
                  <li>Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information.</li>
                  <li>Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies.</li>
                  <li>From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf.</li>
                  <li>From our partners or other third parties.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">How We Use Your Personal Information</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6 marker:text-[#cfae70]">
                  <li>Provide, tailor, and improve the Services, process orders, returns, exchanges and account management.</li>
                  <li>Marketing and advertising communications where permitted.</li>
                  <li>Security and fraud prevention.</li>
                  <li>Communicating with you for support and service updates.</li>
                  <li>Legal reasons, including compliance with applicable law and valid legal process.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">How We Disclose Personal Information</h2>
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6 marker:text-[#cfae70]">
                  <li>With vendors and other third parties who perform services on our behalf (for example IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                  <li>With business and marketing partners to provide marketing services and advertise to you.</li>
                  <li>When you direct, request, or consent to our disclosure of certain information to third parties.</li>
                  <li>With our affiliates or otherwise within our corporate group.</li>
                  <li>In connection with a business transaction, to comply with legal obligations, and to protect our rights and users.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Third Party Websites and Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services may provide links to websites or platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and terms. We are not responsible for the privacy or security of such sites.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Children&apos;s Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Services are not intended to be used by children, and we do not knowingly collect personal information about children under the age of majority in your jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Security and Retention of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  No security measure is perfect or impenetrable, and we cannot guarantee perfect security. We retain personal information based on operational needs, legal obligations, dispute resolution and enforcement requirements.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on where you live, you may have rights to access, delete, correct, and port your personal information, and to manage communication preferences. We may need to verify your identity before processing requests.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Complaints</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have complaints about how we process your personal information, please contact us using the contact details below. You may also have the right to lodge a complaint with your local data protection authority.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">International Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may transfer, store and process your personal information outside your country. Where required, we rely on recognized transfer mechanisms under applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time for operational, legal, or regulatory reasons. We will update the &quot;Last updated&quot; date when changes are made.
                </p>
              </section>

              <section className="bg-secondary p-8 rounded-sm border border-border mt-12">
                <h2 className="text-3xl font-fraunces font-normal mb-6 text-foreground">Reach out to us</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground font-medium">Email:</strong> info@woxly.in</p>
                  <p><strong className="text-foreground font-medium">Phone:</strong> +91 73063 47297</p>
                  <p><strong className="text-foreground font-medium">Working hours:</strong> Mon-Sun, 9:00 AM - 9:00 PM</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
