import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdoptionNotificationRequest {
  petName: string;
  adopter_name: string;
  adopter_email: string;
  adopter_phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { petName, adopter_name, adopter_email, adopter_phone }: AdoptionNotificationRequest = await req.json();

    console.log("Sending adoption notification for:", petName);

    const emailResponse = await resend.emails.send({
      from: "Pet Adoption <onboarding@resend.dev>",
      to: ["heena@petsu.in"],
      subject: `New Adoption Request for ${petName}`,
      html: `
        <h2>New Adoption Request</h2>
        <p>A new adoption request has been submitted for <strong>${petName}</strong>.</p>
        
        <h3>Adopter Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${adopter_name}</li>
          <li><strong>Email:</strong> ${adopter_email}</li>
          <li><strong>Phone:</strong> ${adopter_phone}</li>
        </ul>
        
        <p>Please contact the adopter to proceed with the adoption process.</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-adoption-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
