import { AdminActionTemplate } from "@/models/banTemplate";
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
    actionType: "account_ban",
    duration: 168, // 1 week
    reason: "Your account has been suspended for posting spam or excessive promotional content. This violates our community guidelines regarding authentic engagement.",
    severity: "medium"
  },
  {
    name: "Harassment",
    description: "User engaging in harassment or bullying",
    actionType: "account_ban",
    duration: 720, // 1 month
    reason: "Your account has been suspended for harassment or bullying behavior towards other users. We maintain a zero-tolerance policy for such conduct.",
    severity: "high"
  },
  {
    name: "Hate Speech",
    description: "User posting hate speech or discriminatory content",
    actionType: "account_ban",
    duration: null, // Permanent
    reason: "Your account has been permanently suspended for posting hate speech or discriminatory content. This behavior is strictly prohibited on our platform.",
    severity: "critical"
  },
  {
    name: "Copyright Violation",
    description: "User posting copyrighted content without permission",
    actionType: "account_ban",
    duration: 336, // 2 weeks
    reason: "Your account has been suspended for posting copyrighted content without proper authorization. Please respect intellectual property rights.",
    severity: "medium"
  },
  {
    name: "Fake Information",
    description: "User spreading misinformation or fake news",
    actionType: "account_ban",
    duration: 240, // 10 days
    reason: "Your account has been suspended for spreading misinformation or fake news. We are committed to maintaining the integrity of information on our platform.",
    severity: "high"
  },

  // Comment Ban Templates
  {
    name: "Inappropriate Comments",
    description: "User posting inappropriate or offensive comments",
    actionType: "comment_ban",
    duration: 72, // 3 days
    reason: "Your commenting privileges have been suspended for posting inappropriate or offensive comments. Please maintain respectful discourse.",
    severity: "low"
  },
  {
    name: "Comment Spam",
    description: "User posting repetitive or spam comments",
    actionType: "comment_ban",
    duration: 168, // 1 week
    reason: "Your commenting privileges have been suspended for posting spam or repetitive comments. Quality engagement is encouraged over quantity.",
    severity: "medium"
  },
  {
    name: "Trolling",
    description: "User engaging in trolling or disruptive behavior",
    actionType: "comment_ban",
    duration: 336, // 2 weeks
    reason: "Your commenting privileges have been suspended for trolling or disruptive behavior. Please contribute constructively to discussions.",
    severity: "medium"
  },
  {
    name: "Personal Attacks",
    description: "User making personal attacks in comments",
    actionType: "comment_ban",
    duration: 240, // 10 days
    reason: "Your commenting privileges have been suspended for making personal attacks. Please focus on discussing ideas rather than attacking individuals.",
    severity: "high"
  },
  {
    name: "Off-topic Spam",
    description: "User consistently posting off-topic comments",
    actionType: "comment_ban",
    duration: 120, // 5 days
    reason: "Your commenting privileges have been suspended for consistently posting off-topic comments. Please keep discussions relevant to the blog content.",
    severity: "low"
  },

  // Username Change Templates
  {
    name: "Inappropriate Username",
    description: "Username contains inappropriate or offensive content",
    actionType: "username_change",
    duration: null,
    reason: "Your username has been changed due to inappropriate or offensive content. Please choose usernames that comply with our community guidelines.",
    severity: "medium"
  },
  {
    name: "Impersonation",
    description: "Username impersonates another user or public figure",
    actionType: "username_change",
    duration: null,
    reason: "Your username has been changed due to impersonation concerns. Usernames that impersonate others are not allowed on our platform.",
    severity: "high"
  },
  {
    name: "Trademark Violation",
    description: "Username violates trademark or brand rights",
    actionType: "username_change",
    duration: null,
    reason: "Your username has been changed due to trademark violation. Please avoid using trademarked names or brands in your username.",
    severity: "medium"
  },
  {
    name: "Spam Username",
    description: "Username designed for spam or promotional purposes",
    actionType: "username_change",
    duration: null,
    reason: "Your username has been changed as it appeared to be designed for spam or promotional purposes. Please use a genuine username.",
    severity: "low"
  },

  // Delete Account Templates
  {
    name: "Severe Policy Violation",
    description: "Account repeatedly violates platform policies",
    actionType: "delete_account",
    duration: null,
    reason: "Your account has been permanently deleted due to severe and repeated violations of our platform policies. This action is irreversible.",
    severity: "critical"
  },
  {
    name: "Illegal Content",
    description: "Account used to share illegal content",
    actionType: "delete_account",
    duration: null,
    reason: "Your account has been permanently deleted for sharing illegal content. We have zero tolerance for illegal activities on our platform.",
    severity: "critical"
  },
  {
    name: "Security Threat",
    description: "Account poses security threat to platform or users",
    actionType: "delete_account",
    duration: null,
    reason: "Your account has been permanently deleted due to security concerns. This action was taken to protect our platform and users.",
    severity: "critical"
  },
  {
    name: "Fraud Activity",
    description: "Account involved in fraudulent activities",
    actionType: "delete_account",
    duration: null,
    reason: "Your account has been permanently deleted due to fraudulent activities. We maintain strict policies against fraud and deception.",
    severity: "critical"
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
        const existingTemplates = await AdminActionTemplate.countDocuments();
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

        const createdTemplates = await AdminActionTemplate.insertMany(templatesWithCreator);

        return NextResponse.json({
            success: true,
            message: `${createdTemplates.length} default admin action templates created successfully`,
            count: createdTemplates.length
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error seeding admin action templates:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to seed admin action templates',
                error: error.message,
            },
            { status: 500 }
        );
    }
}