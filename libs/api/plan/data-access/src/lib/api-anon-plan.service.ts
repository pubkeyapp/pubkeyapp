import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

const plans: Prisma.PlanCreateInput[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Connect your community to everything you are',
    priceMonth: 0,
    priceYear: 0,
    currency: 'USD',
    recommended: true,
    available: true,
    features: {
      create: [
        { name: 'Unlimited links and Link Apps' },
        { name: 'Clicks and views for past 28 days' },
        { name: 'Collect payments, tips and donations' },
        { name: '0% transaction fees for a limited time' },
      ],
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Customize and control your PubKey Page',
    priceMonth: 400,
    priceYear: 300,
    currency: 'USD',
    recommended: false,
    available: false,
    features: {
      create: [
        { name: 'Customizable themes, buttons and fonts ' },
        { name: 'Clicks and views for past 90 days' },
        { name: 'Spotlight, schedule and animate links' },
        { name: 'Priority support, response time 24 hours' },
        { name: '0% transaction fees for a limited time' },
      ],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Grow, know and own your following',
    priceMonth: 800,
    priceYear: 600,
    currency: 'USD',
    recommended: false,
    available: false,
    features: {
      create: [
        { name: 'Enhanced customization of themes, buttons and fonts' },
        { name: 'Lifetime analytics and powerful insights' },
        { name: 'Integrations with Mailchimp, Google Analytics and more' },
        { name: 'Commerce analytics to track revenue' },
        { name: 'Collect email and phone numbers' },
        { name: 'Automatically embed your latest Tweet or YouTube video' },
        { name: 'Remove the PubKey logo' },
        { name: '0% transaction fees for a limited time' },
      ],
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'VIP plan for creators and businesses',
    priceMonth: 800,
    priceYear: 600,
    currency: 'USD',
    recommended: false,
    available: false,
    features: {
      create: [
        { name: 'Dedicated customer success manager' },
        { name: 'Export your lifetime data' },
        { name: 'Access to exclusive webinars & best practice videos' },
        { name: '1-1 Onboarding & Success Meeting' },
        { name: 'Premium support, response time 4 hours' },
      ],
    },
  },
]

@Injectable()
export class ApiAnonPlanService implements OnModuleInit {
  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit(): Promise<void> {
    const count = await this.core.data.plan.count()
    if (count === 0) {
      for (const plan of plans) {
        await this.core.data.plan.create({
          data: plan,
        })
      }
    }
  }

  anonGetPlans() {
    return this.core.data.plan.findMany({
      orderBy: { priceMonth: 'asc' },
      include: { features: { orderBy: { order: 'asc' } } },
    })
  }
}
