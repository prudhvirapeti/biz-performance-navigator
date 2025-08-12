import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Simple client-side validation
    if (!name || !email || !message) {
      toast({ title: "Missing fields", description: "Please fill in your name, email, and message." });
      setLoading(false);
      return;
    }

    toast({ title: "Message sent", description: "Thanks for reaching out — I’ll reply within 24 hours." });
    form.reset();
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Contact – Get in Touch</title>
        <meta name="description" content="Contact me about Power BI and data analytics roles. I respond within 24 hours." />
        <link rel="canonical" href={`${window.location.origin}/contact`} />
      </Helmet>

      <section className="container mx-auto px-6 md:px-12 py-10 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Contact</h1>
        <p className="text-sm text-muted-foreground mb-6">Prefer email? Reach me at <a href="mailto:prudhvirajrapeti@gmail.com" className="underline-offset-4 hover:underline">prudhvirajrapeti@gmail.com</a>.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Tell me about the role, timeline, and any context" rows={6} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>{loading ? "Sending…" : "Send Message"}</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
