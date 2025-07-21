import BanTemplate from "@/models/banTemplate";
import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

const defaultTemplates = [
  // Account Ban Templates
  {
    name: "Spam Content",
    description: "User posting spam or promotional content",
    banType: "account",
    duration: 168, // 1 week
    reason: "Your account has been suspended for posting spam or excessive promotional content. This violates our community guidelines regarding authentic engagement.",
    severity: "medium"
  },
  {
    name: "Harassment",
    description: "User engaging in harassment or bullying",
    banType: "account",
    duration: 720, // 1 month
    reason: "Your account has been suspended for harassment or bullying behavior towards other users. We maintain a zero-tolerance policy for such conduct.",
    severity: "high"
  },
  {
    name: "Hate Speech",
    description: "User posting hate speech or discriminatory content",
    banType: "account",
    duration: null, // Permanent
    reason: "Your account has been permanently suspended for posting hate speech or discriminatory content. This behavior is strictly prohibited on our platform.",
    severity: "critical"
  },
  {
    name: "Copyright Violation",
    description: "User posting copyrighted content without permission",
    banType: "account",
    duration: 336, // 2 weeks
    reason: "Your account has been suspended for posting copyrighted content without proper authorization. Please respect intellectual property rights.",
    severity: "medium"
  },
  {
    name: "Fake Information",
    description: "User spreading misinformation or fake news",
    banType: "account",
    duration: 240, // 10 days
    reason: "Your account has been suspended for spreading misinformation or fake news. We are committed to maintaining the integrity of information on our platform.",
    severity: "high"
  },

  // Comment Ban Templates
  {
    name: "Inappropriate Comments",
    description: "User posting inappropriate or offensive comments",
    banType: "comment",
    duration: 72, // 3 days
    reason: "Your commenting privileges have been suspended for posting inappropriate or offensive comments. Please maintain respectful discourse.",
    severity: "low"
  },
  {
    name: "Comment Spam",
    description: "User posting repetitive or spam comments",
    banType: "comment",
    duration: 168, // 1 week
    reason: "Your commenting privileges have been suspended for posting spam or repetitive comments. Quality engagement is encouraged over quantity.",
    severity: "medium"
  },
  {
    name: "Trolling",
    description: "User engaging in trolling or disruptive behavior",
    banType: "comment",
    duration: 336, // 2 weeks
    reason: "Your commenting privileges have been suspended for trolling or disruptive behavior. Please contribute constructively to discussions.",
    severity: "medium"
  },
  {
    name: "Personal Attacks",
    description: "User making personal attacks in comments",
    banType: "comment",
    duration: 240, // 10 days
    reason: "Your commenting privileges have been suspended for making personal attacks. Please focus on discussing ideas rather than attacking individuals.",
    severity: "high"
  },
  {
    name: "Off-topic Spam",
    description: "User consistently posting off-topic comments",
    banType: "comment",
    duration: 120, // 5 days
    reason: "Your commenting privileges have been suspended for consistently posting off-topic comments. Please keep discussions relevant to the blog content.",
    severity: "low"
  }
];

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        await connectdb();

        // Check if templates already exist
        const existingTemplates = await BanTemplate.countDocuments();
        if (existingTemplates > 0) {
            return NextResponse.json(
                { message: "Templates already exist. Use the management interface to modify them." },
                { status: 400 }
            );
        }

        // Create default templates
        const templatesWithCreator = defaultTemplates.map(template => ({
            ...template,
            createdBy: session.user.dbid
        }));

        const createdTemplates = await BanTemplate.insertMany(templatesWithCreator);

        return NextResponse.json({
            success: true,
            message: `${createdTemplates.length} default ban templates created successfully`,
            count: createdTemplates.length
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error seeding ban templates:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to seed ban templates',
                error: error.message,
            },
            { status: 500 }
        );
    }
}