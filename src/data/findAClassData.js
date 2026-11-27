// Dynamic API venues data for Find a Class page

export const AGE_GROUPS = [
  { id: '4-5', label: '4–5', fullLabel: '4–5 Years', level: 'Beginner' },
  { id: '6-7', label: '6–7', fullLabel: '6–7 Years', level: 'Intermediate' },
  { id: '8-9', label: '8–9', fullLabel: '8–9 Years', level: 'Advanced' },
  { id: '10-12', label: '10–12', fullLabel: '10–12 Years', level: 'Pro' }
];

export const RAW_VENUES_DATA = [
  {
    "venueId": 5,
    "venueName": "chelsea academy",
    "area": "chelsea",
    "address": "lots road",
    "facility": "Indoor",
    "starterPack": true,
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "parkingNote": "dsaz",
    "isCongested": false,
    "hasParking": true,
    "latitude": 51.4783,
    "longitude": -0.181399,
    "createdAt": "2026-10-08T14:58:57.000Z",
    "postal_code": null,
    "distanceMiles": 10272.7,
    "createdBy": 1,
    "classes": {
      "saturday": [
        {
          "classId": 12,
          "className": "4-5 years",
          "time": "7:15 AM - 8:15 AM",
          "capacity": 0,
          "level": "Beginner",
          "totalCapacity": 19,
          "allowFreeTrial": true
        }
      ]
    },
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 3,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "terms": [
      {
        "id": 4,
        "name": "Autumn",
        "day": "saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 5,
        "name": "Spring",
        "day": "saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 6,
        "name": "Summer",
        "day": "saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      }
    ]
  },
  {
    "venueId": 4,
    "venueName": "Greenwich Peninsula Football Arena",
    "area": "South East London",
    "address": "Tunnel Avenue, Greenwich, London SE10 0QE",
    "facility": "Indoor",
    "starterPack": true,
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "parkingNote": "test",
    "isCongested": false,
    "hasParking": true,
    "latitude": 51.4976,
    "longitude": 0.0016625,
    "createdAt": "2026-09-10T09:38:41.000Z",
    "postal_code": "SE10 0QE",
    "distanceMiles": 10265.8,
    "createdBy": 5,
    "classes": {
      "saturday": [
        {
          "classId": 9,
          "className": "4–5 Years",
          "time": "8:00 AM - 9:00 AM",
          "capacity": 15,
          "level": "Beginner",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 10,
          "className": "6-7  Years",
          "time": "9:00 AM - 10:00 AM",
          "capacity": 18,
          "level": "Intermediate",
          "totalCapacity": 20,
          "allowFreeTrial": true
        }
      ]
    },
    "paymentGroups": [
      {
        "id": 2,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-10T08:37:24.000Z",
        "updatedAt": "2026-09-10T08:37:24.000Z",
        "paymentPlans": [
          {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 5,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "terms": [
      {
        "id": 10,
        "name": "Autumn",
        "day": "saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "termGroupId": 5,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      },
      {
        "id": 11,
        "name": "Spring",
        "day": "saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "termGroupId": 5,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      },
      {
        "id": 12,
        "name": "Summer",
        "day": "saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "termGroupId": 5,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      }
    ]
  },
  {
    "venueId": 3,
    "venueName": "Wimbledon Community Sports Hub",
    "area": "South West London",
    "address": "Pelham Road, Wimbledon, London SW19 1NX",
    "facility": "Indoor",
    "starterPack": true,
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "parkingNote": "Test",
    "isCongested": false,
    "hasParking": true,
    "latitude": 51.4175,
    "longitude": -0.197513,
    "createdAt": "2026-09-10T09:37:27.000Z",
    "postal_code": "SW19 1NX",
    "distanceMiles": 10275.9,
    "createdBy": 5,
    "classes": {
      "tuesday": [
        {
          "classId": 11,
          "className": "4-5 Years",
          "time": "11:00 AM - 12:00 PM",
          "capacity": 18,
          "level": "Beginner",
          "totalCapacity": 20,
          "allowFreeTrial": true
        }
      ]
    },
    "paymentGroups": [
      {
        "id": 2,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-10T08:37:24.000Z",
        "updatedAt": "2026-09-10T08:37:24.000Z",
        "paymentPlans": [
          {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 4,
        "name": "Tuesday 2026/2027 Season"
      }
    ],
    "terms": [
      {
        "id": 7,
        "name": "Autumn",
        "day": "tuesday",
        "startDate": "2026-09-15",
        "endDate": "2026-10-27",
        "termGroupId": 4,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-15",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2026-09-22",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2026-09-29",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2026-10-06",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2026-10-13",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2026-10-20",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2026-10-27",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      },
      {
        "id": 8,
        "name": "Spring",
        "day": "tuesday",
        "startDate": "2027-01-05",
        "endDate": "2027-02-16",
        "termGroupId": 4,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-05",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-01-12",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-01-19",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-01-26",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-02-02",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-02-09",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-02-16",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      },
      {
        "id": 9,
        "name": "Summer",
        "day": "tuesday",
        "startDate": "2027-04-13",
        "endDate": "2027-05-25",
        "termGroupId": 4,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-13",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-04-20",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-04-27",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-05-04",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-05-11",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-05-18",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-05-25",
            "sessionPlanId": 16
          }
        ],
        "createdBy": 5
      }
    ]
  },
  {
    "venueId": 2,
    "venueName": "North London Academy Arena",
    "area": "North London",
    "address": "88 Highbury Grove, Islington, London N5 2AG",
    "facility": "Outdoor",
    "starterPack": true,
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "parkingNote": "",
    "isCongested": true,
    "hasParking": false,
    "latitude": 51.5531,
    "longitude": -0.0983791,
    "createdAt": "2026-09-09T11:25:58.000Z",
    "postal_code": "N5 2AB",
    "distanceMiles": 10266.6,
    "createdBy": 1,
    "classes": {
      "tuesday": [
        {
          "classId": 1,
          "className": "4–5 Years",
          "time": "4:00 PM - 5:00 PM",
          "capacity": 19,
          "level": "Beginner",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 2,
          "className": "6–7 Years",
          "time": "5:00 PM - 6:00 PM",
          "capacity": 19,
          "level": "Intermediate",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 3,
          "className": "8–9 Years",
          "time": "7:00 AM - 8:00 AM",
          "capacity": 20,
          "level": "Advanced",
          "totalCapacity": 20,
          "allowFreeTrial": false
        },
        {
          "classId": 4,
          "className": "10–12 Years",
          "time": "9:00 AM - 10:00 AM",
          "capacity": 20,
          "level": "Pro",
          "totalCapacity": 20,
          "allowFreeTrial": true
        }
      ]
    },
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 1,
        "name": "Tuesday 2026/2027"
      }
    ],
    "terms": [
      {
        "id": 1,
        "name": "Autumn",
        "day": "tuesday",
        "startDate": "2026-09-15",
        "endDate": "2026-10-27",
        "termGroupId": 1,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-15",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-22",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-09-29",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-06",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-13",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-20",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-27",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 2,
        "name": "Spring",
        "day": "tuesday",
        "startDate": "2027-01-05",
        "endDate": "2027-02-16",
        "termGroupId": 1,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-05",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-12",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-19",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-26",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-02",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-09",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-16",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 3,
        "name": "Summer",
        "day": "tuesday",
        "startDate": "2027-04-13",
        "endDate": "2027-05-25",
        "termGroupId": 1,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-13",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-04-20",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-04-27",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-05-04",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-11",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-18",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-25",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      }
    ]
  },
  {
    "venueId": 1,
    "venueName": "West London Sports Centre",
    "area": "West London",
    "address": "15 Commonwealth Way, Acton, London W3 7XX",
    "facility": "Indoor",
    "starterPack": true,
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "parkingNote": "ABC",
    "isCongested": false,
    "hasParking": true,
    "latitude": 51.5121,
    "longitude": -0.267572,
    "createdAt": "2026-09-09T11:25:14.000Z",
    "postal_code": "W3",
    "distanceMiles": 10274,
    "createdBy": 1,
    "classes": {
      "saturday": [
        {
          "classId": 5,
          "className": "4–5 Years",
          "time": "10:00 AM - 11:00 AM",
          "capacity": 13,
          "level": "Beginner",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 6,
          "className": "6–7 Years",
          "time": "12:00 PM - 1:00 PM",
          "capacity": 20,
          "level": "Intermediate",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 7,
          "className": "8–9 Years",
          "time": "2:00 PM - 3:00 PM",
          "capacity": 19,
          "level": "Advanced",
          "totalCapacity": 20,
          "allowFreeTrial": true
        },
        {
          "classId": 8,
          "className": "10–11 Years",
          "time": "4:00 PM - 5:00 PM",
          "capacity": 20,
          "level": "Pro",
          "totalCapacity": 20,
          "allowFreeTrial": false
        }
      ]
    },
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 3,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "terms": [
      {
        "id": 4,
        "name": "Autumn",
        "day": "saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 5,
        "name": "Spring",
        "day": "saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      },
      {
        "id": 6,
        "name": "Summer",
        "day": "saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "termGroupId": 3,
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 7
          }
        ],
        "createdBy": 1
      }
    ]
  }
];

export const VENUES_DATA = [
  {
    "id": "5",
    "venueId": 5,
    "name": "Chelsea Academy",
    "venueName": "chelsea academy",
    "area": "chelsea",
    "address": "lots road",
    "postcode": "-",
    "postal_code": "-",
    "lat": 51.4783,
    "lng": -0.181399,
    "facility": "Indoor",
    "parkingNote": "dsaz",
    "hasParking": true,
    "isCongested": false,
    "distanceMiles": 10272.7,
    "distanceDisplay": "10,272.7 mi",
    "mapDistanceDisplay": "10,272.7 mi",
    "parkingInfo": {
      "hasParking": true,
      "parkingNote": "dsaz",
      "isCongested": false
    },
    "schedule": {
      "day": "Saturday",
      "classes": [
        {
          "id": "12",
          "classId": 12,
          "time": "7:15 AM - 8:15 AM",
          "timeShort": "Saturday 7:15 AM - 8:15 AM",
          "day": "Saturday",
          "ageId": "4-5",
          "ageGroup": "4-5 years · Beginner",
          "ageSimple": "4-5 years",
          "level": "Beginner",
          "capacity": 0,
          "totalCapacity": 19,
          "spacesLeft": 0,
          "statusType": "full",
          "statusText": "Fully booked",
          "allowFreeTrial": true,
          "canBookTrial": false,
          "canBookMembership": true,
          "rawClass": {
            "classId": 12,
            "className": "4-5 years",
            "time": "7:15 AM - 8:15 AM",
            "capacity": 0,
            "level": "Beginner",
            "totalCapacity": 19,
            "allowFreeTrial": true
          }
        }
      ]
    },
    "pricing": {
      "1": {
        "m12": "45.00",
        "m6": "50.00",
        "save": 120,
        "plans": {
          "p12": {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p6": {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p1": {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          }
        }
      },
      "2": {
        "m12": "40.83",
        "m6": "45.00",
        "save": 220,
        "plans": {
          "p12": {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      },
      "3": {
        "m12": "38.33",
        "m6": "42.22",
        "save": 300,
        "plans": {
          "p12": {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      }
    },
    "starterPack": {
      "id": 1,
      "title": "Starter Pack",
      "price": "89.99",
      "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
      "paymentRouting": "head_office"
    },
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "terms": [
      {
        "id": "4",
        "name": "Autumn term",
        "day": "Saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "start": "2026-09-19",
        "end": "2026-10-31",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "5",
        "name": "Spring term",
        "day": "Saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "start": "2027-01-09",
        "end": "2027-02-20",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "6",
        "name": "Summer term",
        "day": "Saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "start": "2027-04-17",
        "end": "2027-05-29",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 7
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 3,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "raw": {
      "venueId": 5,
      "venueName": "chelsea academy",
      "area": "chelsea",
      "address": "lots road",
      "facility": "Indoor",
      "starterPack": true,
      "starterPacks": [
        {
          "id": 1,
          "title": "Starter Pack",
          "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
          "price": 89.99,
          "paymentRouting": "head_office"
        }
      ],
      "parkingNote": "dsaz",
      "isCongested": false,
      "hasParking": true,
      "latitude": 51.4783,
      "longitude": -0.181399,
      "createdAt": "2026-10-08T14:58:57.000Z",
      "postal_code": null,
      "distanceMiles": 10272.7,
      "createdBy": 1,
      "classes": {
        "saturday": [
          {
            "classId": 12,
            "className": "4-5 years",
            "time": "7:15 AM - 8:15 AM",
            "capacity": 16,
            "level": "Beginner",
            "totalCapacity": 24,
            "allowFreeTrial": true
          }
        ]
      },
      "paymentGroups": [
        {
          "id": 1,
          "name": "Weekly Football Classes",
          "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
          "createdAt": "2026-09-09T14:21:45.000Z",
          "updatedAt": "2026-09-09T09:40:56.000Z",
          "paymentPlans": [
            {
              "id": 1,
              "title": "1 Month Membership",
              "price": 55,
              "priceLesson": 13.75,
              "interval": "month",
              "duration": 1,
              "students": 1,
              "joiningFee": 25,
              "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
              "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 1,
                "payment_plan_id": 1,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 2,
              "title": "6 Month Membership",
              "price": 300,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 6,
              "students": 1,
              "joiningFee": 15,
              "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
              "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 2,
                "payment_plan_id": 2,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 3,
              "title": "12 Month Membership",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 12,
              "students": 1,
              "joiningFee": 0,
              "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
              "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 3,
                "payment_plan_id": 3,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 4,
              "title": "1 Month Membership (2 Students)",
              "price": 100,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 1,
              "students": 2,
              "joiningFee": 40,
              "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 4,
                "payment_plan_id": 4,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 5,
              "title": "6 Month Membership (2 Students)",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 6,
              "students": 2,
              "joiningFee": 25,
              "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 5,
                "payment_plan_id": 5,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 6,
              "title": "12 Month Membership (2 Students)",
              "price": 980,
              "priceLesson": 10.2,
              "interval": "month",
              "duration": 12,
              "students": 2,
              "joiningFee": 0,
              "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
              "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 6,
                "payment_plan_id": 6,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 7,
              "title": "1 Month Membership (3 Students)",
              "price": 140,
              "priceLesson": 11.66,
              "interval": "month",
              "duration": 1,
              "students": 3,
              "joiningFee": 50,
              "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 7,
                "payment_plan_id": 7,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 8,
              "title": "6 Month Membership (3 Students)",
              "price": 760,
              "priceLesson": 10.55,
              "interval": "month",
              "duration": 6,
              "students": 3,
              "joiningFee": 30,
              "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 8,
                "payment_plan_id": 8,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 9,
              "title": "12 Month Membership (3 Students)",
              "price": 1380,
              "priceLesson": 9.58,
              "interval": "month",
              "duration": 12,
              "students": 3,
              "joiningFee": 0,
              "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
              "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 9,
                "payment_plan_id": 9,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            }
          ]
        }
      ],
      "termGroups": [
        {
          "id": 3,
          "name": "Saturday 2026/2027 Season"
        }
      ],
      "terms": [
        {
          "id": 4,
          "name": "Autumn",
          "day": "saturday",
          "startDate": "2026-09-19",
          "endDate": "2026-10-31",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2026-09-19",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2026-09-26",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2026-10-03",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2026-10-10",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2026-10-17",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2026-10-24",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2026-10-31",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 5,
          "name": "Spring",
          "day": "saturday",
          "startDate": "2027-01-09",
          "endDate": "2027-02-20",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-01-09",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-01-16",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-01-23",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-01-30",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-02-06",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-02-13",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-02-20",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 6,
          "name": "Summer",
          "day": "saturday",
          "startDate": "2027-04-17",
          "endDate": "2027-05-29",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-04-17",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-04-24",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-05-01",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-05-08",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-05-15",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-05-22",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-05-29",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        }
      ]
    }
  },
  {
    "id": "4",
    "venueId": 4,
    "name": "Greenwich Peninsula Football Arena",
    "venueName": "Greenwich Peninsula Football Arena",
    "area": "South East London",
    "address": "Tunnel Avenue, Greenwich, London SE10 0QE",
    "postcode": "SE10 0QE",
    "postal_code": "SE10 0QE",
    "lat": 51.4976,
    "lng": 0.0016625,
    "facility": "Indoor",
    "parkingNote": "test",
    "hasParking": true,
    "isCongested": false,
    "distanceMiles": 10265.8,
    "distanceDisplay": "10,265.8 mi",
    "mapDistanceDisplay": "10,265.8 mi",
    "parkingInfo": {
      "hasParking": true,
      "parkingNote": "test",
      "isCongested": false
    },
    "schedule": {
      "day": "Saturday",
      "classes": [
        {
          "id": "9",
          "classId": 9,
          "time": "8:00 AM - 9:00 AM",
          "timeShort": "Saturday 8:00 AM - 9:00 AM",
          "day": "Saturday",
          "ageId": "4-5",
          "ageGroup": "4–5 Years · Beginner",
          "ageSimple": "4–5 Years",
          "level": "Beginner",
          "capacity": 15,
          "totalCapacity": 20,
          "spacesLeft": 5,
          "statusType": "few_left",
          "statusText": "Only 5 places left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 9,
            "className": "4–5 Years",
            "time": "8:00 AM - 9:00 AM",
            "capacity": 15,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "10",
          "classId": 10,
          "time": "9:00 AM - 10:00 AM",
          "timeShort": "Saturday 9:00 AM - 10:00 AM",
          "day": "Saturday",
          "ageId": "6-7",
          "ageGroup": "6-7  Years · Intermediate",
          "ageSimple": "6-7  Years",
          "level": "Intermediate",
          "capacity": 18,
          "totalCapacity": 20,
          "spacesLeft": 2,
          "statusType": "few_left",
          "statusText": "Only 2 places left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 10,
            "className": "6-7  Years",
            "time": "9:00 AM - 10:00 AM",
            "capacity": 18,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        }
      ]
    },
    "pricing": {
      "1": {
        "m12": "45.00",
        "m6": "50.00",
        "save": 120,
        "plans": {
          "p12": {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      },
      "2": {
        "m12": "40.83",
        "m6": "45.00",
        "save": 220,
        "plans": {
          "p12": {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      },
      "3": {
        "m12": "38.33",
        "m6": "42.22",
        "save": 300,
        "plans": {
          "p12": {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      }
    },
    "starterPack": {
      "id": 1,
      "title": "Starter Pack",
      "price": "89.99",
      "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
      "paymentRouting": "head_office"
    },
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "terms": [
      {
        "id": "10",
        "name": "Autumn term",
        "day": "Saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "start": "2026-09-19",
        "end": "2026-10-31",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 16
          }
        ]
      },
      {
        "id": "11",
        "name": "Spring term",
        "day": "Saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "start": "2027-01-09",
        "end": "2027-02-20",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 16
          }
        ]
      },
      {
        "id": "12",
        "name": "Summer term",
        "day": "Saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "start": "2027-04-17",
        "end": "2027-05-29",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 16
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 5,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "paymentGroups": [
      {
        "id": 2,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-10T08:37:24.000Z",
        "updatedAt": "2026-09-10T08:37:24.000Z",
        "paymentPlans": [
          {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        ]
      }
    ],
    "raw": {
      "venueId": 4,
      "venueName": "Greenwich Peninsula Football Arena",
      "area": "South East London",
      "address": "Tunnel Avenue, Greenwich, London SE10 0QE",
      "facility": "Indoor",
      "starterPack": true,
      "starterPacks": [
        {
          "id": 1,
          "title": "Starter Pack",
          "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
          "price": 89.99,
          "paymentRouting": "head_office"
        }
      ],
      "parkingNote": "test",
      "isCongested": false,
      "hasParking": true,
      "latitude": 51.4976,
      "longitude": 0.0016625,
      "createdAt": "2026-09-10T09:38:41.000Z",
      "postal_code": "SE10 0QE",
      "distanceMiles": 10265.8,
      "createdBy": 5,
      "classes": {
        "saturday": [
          {
            "classId": 9,
            "className": "4–5 Years",
            "time": "8:00 AM - 9:00 AM",
            "capacity": 15,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 10,
            "className": "6-7  Years",
            "time": "9:00 AM - 10:00 AM",
            "capacity": 18,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        ]
      },
      "paymentGroups": [
        {
          "id": 2,
          "name": "Weekly Football Classes",
          "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
          "createdAt": "2026-09-10T08:37:24.000Z",
          "updatedAt": "2026-09-10T08:37:24.000Z",
          "paymentPlans": [
            {
              "id": 10,
              "title": "1 Month Membership",
              "price": 55,
              "priceLesson": 13.75,
              "interval": "month",
              "duration": 1,
              "students": 1,
              "joiningFee": 25,
              "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
              "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 10,
                "payment_plan_id": 10,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 11,
              "title": "6 Month Membership",
              "price": 300,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 6,
              "students": 1,
              "joiningFee": 15,
              "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
              "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 11,
                "payment_plan_id": 11,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 12,
              "title": "12 Month Membership",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 12,
              "students": 1,
              "joiningFee": 0,
              "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
              "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 12,
                "payment_plan_id": 12,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 13,
              "title": "1 Month Membership (2 Students)",
              "price": 100,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 1,
              "students": 2,
              "joiningFee": 40,
              "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 13,
                "payment_plan_id": 13,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 14,
              "title": "6 Month Membership (2 Students)",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 6,
              "students": 2,
              "joiningFee": 25,
              "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 14,
                "payment_plan_id": 14,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 15,
              "title": "12 Month Membership (2 Students)",
              "price": 980,
              "priceLesson": 10.2,
              "interval": "month",
              "duration": 12,
              "students": 2,
              "joiningFee": 0,
              "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
              "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 15,
                "payment_plan_id": 15,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 16,
              "title": "1 Month Membership (3 Students)",
              "price": 140,
              "priceLesson": 11.66,
              "interval": "month",
              "duration": 1,
              "students": 3,
              "joiningFee": 50,
              "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 16,
                "payment_plan_id": 16,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 17,
              "title": "6 Month Membership (3 Students)",
              "price": 760,
              "priceLesson": 10.55,
              "interval": "month",
              "duration": 6,
              "students": 3,
              "joiningFee": 30,
              "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 17,
                "payment_plan_id": 17,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 18,
              "title": "12 Month Membership (3 Students)",
              "price": 1380,
              "priceLesson": 9.58,
              "interval": "month",
              "duration": 12,
              "students": 3,
              "joiningFee": 0,
              "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
              "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 18,
                "payment_plan_id": 18,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            }
          ]
        }
      ],
      "termGroups": [
        {
          "id": 5,
          "name": "Saturday 2026/2027 Season"
        }
      ],
      "terms": [
        {
          "id": 10,
          "name": "Autumn",
          "day": "saturday",
          "startDate": "2026-09-19",
          "endDate": "2026-10-31",
          "termGroupId": 5,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2026-09-19",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2026-09-26",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2026-10-03",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2026-10-10",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2026-10-17",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2026-10-24",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2026-10-31",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        },
        {
          "id": 11,
          "name": "Spring",
          "day": "saturday",
          "startDate": "2027-01-09",
          "endDate": "2027-02-20",
          "termGroupId": 5,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-01-09",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2027-01-16",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2027-01-23",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2027-01-30",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2027-02-06",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2027-02-13",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2027-02-20",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        },
        {
          "id": 12,
          "name": "Summer",
          "day": "saturday",
          "startDate": "2027-04-17",
          "endDate": "2027-05-29",
          "termGroupId": 5,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-04-17",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2027-04-24",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2027-05-01",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2027-05-08",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2027-05-15",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2027-05-22",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2027-05-29",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        }
      ]
    }
  },
  {
    "id": "3",
    "venueId": 3,
    "name": "Wimbledon Community Sports Hub",
    "venueName": "Wimbledon Community Sports Hub",
    "area": "South West London",
    "address": "Pelham Road, Wimbledon, London SW19 1NX",
    "postcode": "SW19 1NX",
    "postal_code": "SW19 1NX",
    "lat": 51.4175,
    "lng": -0.197513,
    "facility": "Indoor",
    "parkingNote": "Test",
    "hasParking": true,
    "isCongested": false,
    "distanceMiles": 10275.9,
    "distanceDisplay": "10,275.9 mi",
    "mapDistanceDisplay": "10,275.9 mi",
    "parkingInfo": {
      "hasParking": true,
      "parkingNote": "Test",
      "isCongested": false
    },
    "schedule": {
      "day": "Tuesday",
      "classes": [
        {
          "id": "11",
          "classId": 11,
          "time": "11:00 AM - 12:00 PM",
          "timeShort": "Tuesday 11:00 AM - 12:00 PM",
          "day": "Tuesday",
          "ageId": "4-5",
          "ageGroup": "4-5 Years · Beginner",
          "ageSimple": "4-5 Years",
          "level": "Beginner",
          "capacity": 18,
          "totalCapacity": 20,
          "spacesLeft": 2,
          "statusType": "few_left",
          "statusText": "Only 2 places left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 11,
            "className": "4-5 Years",
            "time": "11:00 AM - 12:00 PM",
            "capacity": 18,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        }
      ]
    },
    "pricing": {
      "1": {
        "m12": "45.00",
        "m6": "50.00",
        "save": 120,
        "plans": {
          "p12": {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      },
      "2": {
        "m12": "40.83",
        "m6": "45.00",
        "save": 220,
        "plans": {
          "p12": {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      },
      "3": {
        "m12": "38.33",
        "m6": "42.22",
        "save": 300,
        "plans": {
          "p12": {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p6": {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          "p1": {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        }
      }
    },
    "starterPack": {
      "id": 1,
      "title": "Starter Pack",
      "price": "89.99",
      "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
      "paymentRouting": "head_office"
    },
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "terms": [
      {
        "id": "7",
        "name": "Autumn term",
        "day": "Tuesday",
        "startDate": "2026-09-15",
        "endDate": "2026-10-27",
        "start": "2026-09-15",
        "end": "2026-10-27",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-15",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2026-09-22",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2026-09-29",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2026-10-06",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2026-10-13",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2026-10-20",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2026-10-27",
            "sessionPlanId": 16
          }
        ]
      },
      {
        "id": "8",
        "name": "Spring term",
        "day": "Tuesday",
        "startDate": "2027-01-05",
        "endDate": "2027-02-16",
        "start": "2027-01-05",
        "end": "2027-02-16",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-05",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-01-12",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-01-19",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-01-26",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-02-02",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-02-09",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-02-16",
            "sessionPlanId": 16
          }
        ]
      },
      {
        "id": "9",
        "name": "Summer term",
        "day": "Tuesday",
        "startDate": "2027-04-13",
        "endDate": "2027-05-25",
        "start": "2027-04-13",
        "end": "2027-05-25",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-13",
            "sessionPlanId": 10
          },
          {
            "sessionDate": "2027-04-20",
            "sessionPlanId": 11
          },
          {
            "sessionDate": "2027-04-27",
            "sessionPlanId": 12
          },
          {
            "sessionDate": "2027-05-04",
            "sessionPlanId": 13
          },
          {
            "sessionDate": "2027-05-11",
            "sessionPlanId": 14
          },
          {
            "sessionDate": "2027-05-18",
            "sessionPlanId": 15
          },
          {
            "sessionDate": "2027-05-25",
            "sessionPlanId": 16
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 4,
        "name": "Tuesday 2026/2027 Season"
      }
    ],
    "paymentGroups": [
      {
        "id": 2,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-10T08:37:24.000Z",
        "updatedAt": "2026-09-10T08:37:24.000Z",
        "paymentPlans": [
          {
            "id": 10,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 10,
              "payment_plan_id": 10,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 11,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 11,
              "payment_plan_id": 11,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 12,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 12,
              "payment_plan_id": 12,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 13,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 13,
              "payment_plan_id": 13,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 14,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 14,
              "payment_plan_id": 14,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 15,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 15,
              "payment_plan_id": 15,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 16,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 16,
              "payment_plan_id": 16,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 17,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 17,
              "payment_plan_id": 17,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          },
          {
            "id": 18,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-10T08:37:24.000Z",
            "updatedAt": "2026-09-10T08:37:24.000Z",
            "PaymentGroupHasPlan": {
              "id": 18,
              "payment_plan_id": 18,
              "payment_group_id": 2,
              "createdBy": 5,
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z"
            }
          }
        ]
      }
    ],
    "raw": {
      "venueId": 3,
      "venueName": "Wimbledon Community Sports Hub",
      "area": "South West London",
      "address": "Pelham Road, Wimbledon, London SW19 1NX",
      "facility": "Indoor",
      "starterPack": true,
      "starterPacks": [
        {
          "id": 1,
          "title": "Starter Pack",
          "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
          "price": 89.99,
          "paymentRouting": "head_office"
        }
      ],
      "parkingNote": "Test",
      "isCongested": false,
      "hasParking": true,
      "latitude": 51.4175,
      "longitude": -0.197513,
      "createdAt": "2026-09-10T09:37:27.000Z",
      "postal_code": "SW19 1NX",
      "distanceMiles": 10275.9,
      "createdBy": 5,
      "classes": {
        "tuesday": [
          {
            "classId": 11,
            "className": "4-5 Years",
            "time": "11:00 AM - 12:00 PM",
            "capacity": 18,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        ]
      },
      "paymentGroups": [
        {
          "id": 2,
          "name": "Weekly Football Classes",
          "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
          "createdAt": "2026-09-10T08:37:24.000Z",
          "updatedAt": "2026-09-10T08:37:24.000Z",
          "paymentPlans": [
            {
              "id": 10,
              "title": "1 Month Membership",
              "price": 55,
              "priceLesson": 13.75,
              "interval": "month",
              "duration": 1,
              "students": 1,
              "joiningFee": 25,
              "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
              "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 10,
                "payment_plan_id": 10,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 11,
              "title": "6 Month Membership",
              "price": 300,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 6,
              "students": 1,
              "joiningFee": 15,
              "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
              "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 11,
                "payment_plan_id": 11,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 12,
              "title": "12 Month Membership",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 12,
              "students": 1,
              "joiningFee": 0,
              "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
              "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 12,
                "payment_plan_id": 12,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 13,
              "title": "1 Month Membership (2 Students)",
              "price": 100,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 1,
              "students": 2,
              "joiningFee": 40,
              "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 13,
                "payment_plan_id": 13,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 14,
              "title": "6 Month Membership (2 Students)",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 6,
              "students": 2,
              "joiningFee": 25,
              "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 14,
                "payment_plan_id": 14,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 15,
              "title": "12 Month Membership (2 Students)",
              "price": 980,
              "priceLesson": 10.2,
              "interval": "month",
              "duration": 12,
              "students": 2,
              "joiningFee": 0,
              "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
              "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 15,
                "payment_plan_id": 15,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 16,
              "title": "1 Month Membership (3 Students)",
              "price": 140,
              "priceLesson": 11.66,
              "interval": "month",
              "duration": 1,
              "students": 3,
              "joiningFee": 50,
              "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 16,
                "payment_plan_id": 16,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 17,
              "title": "6 Month Membership (3 Students)",
              "price": 760,
              "priceLesson": 10.55,
              "interval": "month",
              "duration": 6,
              "students": 3,
              "joiningFee": 30,
              "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 17,
                "payment_plan_id": 17,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            },
            {
              "id": 18,
              "title": "12 Month Membership (3 Students)",
              "price": 1380,
              "priceLesson": 9.58,
              "interval": "month",
              "duration": 12,
              "students": 3,
              "joiningFee": 0,
              "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
              "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-10T08:37:24.000Z",
              "updatedAt": "2026-09-10T08:37:24.000Z",
              "PaymentGroupHasPlan": {
                "id": 18,
                "payment_plan_id": 18,
                "payment_group_id": 2,
                "createdBy": 5,
                "createdAt": "2026-09-10T08:37:24.000Z",
                "updatedAt": "2026-09-10T08:37:24.000Z"
              }
            }
          ]
        }
      ],
      "termGroups": [
        {
          "id": 4,
          "name": "Tuesday 2026/2027 Season"
        }
      ],
      "terms": [
        {
          "id": 7,
          "name": "Autumn",
          "day": "tuesday",
          "startDate": "2026-09-15",
          "endDate": "2026-10-27",
          "termGroupId": 4,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2026-09-15",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2026-09-22",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2026-09-29",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2026-10-06",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2026-10-13",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2026-10-20",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2026-10-27",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        },
        {
          "id": 8,
          "name": "Spring",
          "day": "tuesday",
          "startDate": "2027-01-05",
          "endDate": "2027-02-16",
          "termGroupId": 4,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-01-05",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2027-01-12",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2027-01-19",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2027-01-26",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2027-02-02",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2027-02-09",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2027-02-16",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        },
        {
          "id": 9,
          "name": "Summer",
          "day": "tuesday",
          "startDate": "2027-04-13",
          "endDate": "2027-05-25",
          "termGroupId": 4,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-04-13",
              "sessionPlanId": 10
            },
            {
              "sessionDate": "2027-04-20",
              "sessionPlanId": 11
            },
            {
              "sessionDate": "2027-04-27",
              "sessionPlanId": 12
            },
            {
              "sessionDate": "2027-05-04",
              "sessionPlanId": 13
            },
            {
              "sessionDate": "2027-05-11",
              "sessionPlanId": 14
            },
            {
              "sessionDate": "2027-05-18",
              "sessionPlanId": 15
            },
            {
              "sessionDate": "2027-05-25",
              "sessionPlanId": 16
            }
          ],
          "createdBy": 5
        }
      ]
    }
  },
  {
    "id": "2",
    "venueId": 2,
    "name": "North London Academy Arena",
    "venueName": "North London Academy Arena",
    "area": "North London",
    "address": "88 Highbury Grove, Islington, London N5 2AG",
    "postcode": "N5 2AB",
    "postal_code": "N5 2AB",
    "lat": 51.5531,
    "lng": -0.0983791,
    "facility": "Outdoor",
    "parkingNote": "",
    "hasParking": false,
    "isCongested": true,
    "distanceMiles": 10266.6,
    "distanceDisplay": "10,266.6 mi",
    "mapDistanceDisplay": "10,266.6 mi",
    "parkingInfo": {
      "hasParking": false,
      "parkingNote": "",
      "isCongested": true
    },
    "schedule": {
      "day": "Tuesday",
      "classes": [
        {
          "id": "1",
          "classId": 1,
          "time": "4:00 PM - 5:00 PM",
          "timeShort": "Tuesday 4:00 PM - 5:00 PM",
          "day": "Tuesday",
          "ageId": "4-5",
          "ageGroup": "4–5 Years · Beginner",
          "ageSimple": "4–5 Years",
          "level": "Beginner",
          "capacity": 19,
          "totalCapacity": 20,
          "spacesLeft": 1,
          "statusType": "few_left",
          "statusText": "Only 1 place left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 1,
            "className": "4–5 Years",
            "time": "4:00 PM - 5:00 PM",
            "capacity": 19,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "2",
          "classId": 2,
          "time": "5:00 PM - 6:00 PM",
          "timeShort": "Tuesday 5:00 PM - 6:00 PM",
          "day": "Tuesday",
          "ageId": "6-7",
          "ageGroup": "6–7 Years · Intermediate",
          "ageSimple": "6–7 Years",
          "level": "Intermediate",
          "capacity": 19,
          "totalCapacity": 20,
          "spacesLeft": 1,
          "statusType": "few_left",
          "statusText": "Only 1 place left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 2,
            "className": "6–7 Years",
            "time": "5:00 PM - 6:00 PM",
            "capacity": 19,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "3",
          "classId": 3,
          "time": "7:00 AM - 8:00 AM",
          "timeShort": "Tuesday 7:00 AM - 8:00 AM",
          "day": "Tuesday",
          "ageId": "8-9",
          "ageGroup": "8–9 Years · Advanced",
          "ageSimple": "8–9 Years",
          "level": "Advanced",
          "capacity": 20,
          "totalCapacity": 20,
          "spacesLeft": 0,
          "statusType": "full",
          "statusText": "Full",
          "allowFreeTrial": false,
          "canBookTrial": false,
          "canBookMembership": true,
          "rawClass": {
            "classId": 3,
            "className": "8–9 Years",
            "time": "7:00 AM - 8:00 AM",
            "capacity": 20,
            "level": "Advanced",
            "totalCapacity": 20,
            "allowFreeTrial": false
          }
        },
        {
          "id": "4",
          "classId": 4,
          "time": "9:00 AM - 10:00 AM",
          "timeShort": "Tuesday 9:00 AM - 10:00 AM",
          "day": "Tuesday",
          "ageId": "10-12",
          "ageGroup": "10–12 Years · Pro",
          "ageSimple": "10–12 Years",
          "level": "Pro",
          "capacity": 20,
          "totalCapacity": 20,
          "spacesLeft": 0,
          "statusType": "full",
          "statusText": "Full",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 4,
            "className": "10–12 Years",
            "time": "9:00 AM - 10:00 AM",
            "capacity": 20,
            "level": "Pro",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        }
      ]
    },
    "pricing": {
      "1": {
        "m12": "45.00",
        "m6": "50.00",
        "save": 120,
        "plans": {
          "p12": {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p6": {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p1": {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          }
        }
      },
      "2": {
        "m12": "40.83",
        "m6": "45.00",
        "save": 220,
        "plans": {
          "p12": {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      },
      "3": {
        "m12": "38.33",
        "m6": "42.22",
        "save": 300,
        "plans": {
          "p12": {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      }
    },
    "starterPack": {
      "id": 1,
      "title": "Starter Pack",
      "price": "89.99",
      "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
      "paymentRouting": "head_office"
    },
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "terms": [
      {
        "id": "1",
        "name": "Autumn term",
        "day": "Tuesday",
        "startDate": "2026-09-15",
        "endDate": "2026-10-27",
        "start": "2026-09-15",
        "end": "2026-10-27",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-15",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-22",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-09-29",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-06",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-13",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-20",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-27",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "2",
        "name": "Spring term",
        "day": "Tuesday",
        "startDate": "2027-01-05",
        "endDate": "2027-02-16",
        "start": "2027-01-05",
        "end": "2027-02-16",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-05",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-12",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-19",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-26",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-02",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-09",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-16",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "3",
        "name": "Summer term",
        "day": "Tuesday",
        "startDate": "2027-04-13",
        "endDate": "2027-05-25",
        "start": "2027-04-13",
        "end": "2027-05-25",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-13",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-04-20",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-04-27",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-05-04",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-11",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-18",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-25",
            "sessionPlanId": 7
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 1,
        "name": "Tuesday 2026/2027"
      }
    ],
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "raw": {
      "venueId": 2,
      "venueName": "North London Academy Arena",
      "area": "North London",
      "address": "88 Highbury Grove, Islington, London N5 2AG",
      "facility": "Outdoor",
      "starterPack": true,
      "starterPacks": [
        {
          "id": 1,
          "title": "Starter Pack",
          "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
          "price": 89.99,
          "paymentRouting": "head_office"
        }
      ],
      "parkingNote": "",
      "isCongested": true,
      "hasParking": false,
      "latitude": 51.5531,
      "longitude": -0.0983791,
      "createdAt": "2026-09-09T11:25:58.000Z",
      "postal_code": "N5 2AB",
      "distanceMiles": 10266.6,
      "createdBy": 1,
      "classes": {
        "tuesday": [
          {
            "classId": 1,
            "className": "4–5 Years",
            "time": "4:00 PM - 5:00 PM",
            "capacity": 19,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 2,
            "className": "6–7 Years",
            "time": "5:00 PM - 6:00 PM",
            "capacity": 19,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 3,
            "className": "8–9 Years",
            "time": "7:00 AM - 8:00 AM",
            "capacity": 20,
            "level": "Advanced",
            "totalCapacity": 20,
            "allowFreeTrial": false
          },
          {
            "classId": 4,
            "className": "10–12 Years",
            "time": "9:00 AM - 10:00 AM",
            "capacity": 20,
            "level": "Pro",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        ]
      },
      "paymentGroups": [
        {
          "id": 1,
          "name": "Weekly Football Classes",
          "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
          "createdAt": "2026-09-09T14:21:45.000Z",
          "updatedAt": "2026-09-09T09:40:56.000Z",
          "paymentPlans": [
            {
              "id": 1,
              "title": "1 Month Membership",
              "price": 55,
              "priceLesson": 13.75,
              "interval": "month",
              "duration": 1,
              "students": 1,
              "joiningFee": 25,
              "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
              "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 1,
                "payment_plan_id": 1,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 2,
              "title": "6 Month Membership",
              "price": 300,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 6,
              "students": 1,
              "joiningFee": 15,
              "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
              "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 2,
                "payment_plan_id": 2,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 3,
              "title": "12 Month Membership",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 12,
              "students": 1,
              "joiningFee": 0,
              "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
              "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 3,
                "payment_plan_id": 3,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 4,
              "title": "1 Month Membership (2 Students)",
              "price": 100,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 1,
              "students": 2,
              "joiningFee": 40,
              "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 4,
                "payment_plan_id": 4,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 5,
              "title": "6 Month Membership (2 Students)",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 6,
              "students": 2,
              "joiningFee": 25,
              "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 5,
                "payment_plan_id": 5,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 6,
              "title": "12 Month Membership (2 Students)",
              "price": 980,
              "priceLesson": 10.2,
              "interval": "month",
              "duration": 12,
              "students": 2,
              "joiningFee": 0,
              "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
              "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 6,
                "payment_plan_id": 6,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 7,
              "title": "1 Month Membership (3 Students)",
              "price": 140,
              "priceLesson": 11.66,
              "interval": "month",
              "duration": 1,
              "students": 3,
              "joiningFee": 50,
              "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 7,
                "payment_plan_id": 7,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 8,
              "title": "6 Month Membership (3 Students)",
              "price": 760,
              "priceLesson": 10.55,
              "interval": "month",
              "duration": 6,
              "students": 3,
              "joiningFee": 30,
              "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 8,
                "payment_plan_id": 8,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 9,
              "title": "12 Month Membership (3 Students)",
              "price": 1380,
              "priceLesson": 9.58,
              "interval": "month",
              "duration": 12,
              "students": 3,
              "joiningFee": 0,
              "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
              "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 9,
                "payment_plan_id": 9,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            }
          ]
        }
      ],
      "termGroups": [
        {
          "id": 1,
          "name": "Tuesday 2026/2027"
        }
      ],
      "terms": [
        {
          "id": 1,
          "name": "Autumn",
          "day": "tuesday",
          "startDate": "2026-09-15",
          "endDate": "2026-10-27",
          "termGroupId": 1,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2026-09-15",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2026-09-22",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2026-09-29",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2026-10-06",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2026-10-13",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2026-10-20",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2026-10-27",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 2,
          "name": "Spring",
          "day": "tuesday",
          "startDate": "2027-01-05",
          "endDate": "2027-02-16",
          "termGroupId": 1,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-01-05",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-01-12",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-01-19",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-01-26",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-02-02",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-02-09",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-02-16",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 3,
          "name": "Summer",
          "day": "tuesday",
          "startDate": "2027-04-13",
          "endDate": "2027-05-25",
          "termGroupId": 1,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-04-13",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-04-20",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-04-27",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-05-04",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-05-11",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-05-18",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-05-25",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        }
      ]
    }
  },
  {
    "id": "1",
    "venueId": 1,
    "name": "West London Sports Centre",
    "venueName": "West London Sports Centre",
    "area": "West London",
    "address": "15 Commonwealth Way, Acton, London W3 7XX",
    "postcode": "W3",
    "postal_code": "W3",
    "lat": 51.5121,
    "lng": -0.267572,
    "facility": "Indoor",
    "parkingNote": "ABC",
    "hasParking": true,
    "isCongested": false,
    "distanceMiles": 10274,
    "distanceDisplay": "10,274 mi",
    "mapDistanceDisplay": "10,274 mi",
    "parkingInfo": {
      "hasParking": true,
      "parkingNote": "ABC",
      "isCongested": false
    },
    "schedule": {
      "day": "Saturday",
      "classes": [
        {
          "id": "5",
          "classId": 5,
          "time": "10:00 AM - 11:00 AM",
          "timeShort": "Saturday 10:00 AM - 11:00 AM",
          "day": "Saturday",
          "ageId": "4-5",
          "ageGroup": "4–5 Years · Beginner",
          "ageSimple": "4–5 Years",
          "level": "Beginner",
          "capacity": 13,
          "totalCapacity": 20,
          "spacesLeft": 7,
          "statusType": "available",
          "statusText": "Spaces available",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 5,
            "className": "4–5 Years",
            "time": "10:00 AM - 11:00 AM",
            "capacity": 13,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "6",
          "classId": 6,
          "time": "12:00 PM - 1:00 PM",
          "timeShort": "Saturday 12:00 PM - 1:00 PM",
          "day": "Saturday",
          "ageId": "6-7",
          "ageGroup": "6–7 Years · Intermediate",
          "ageSimple": "6–7 Years",
          "level": "Intermediate",
          "capacity": 20,
          "totalCapacity": 20,
          "spacesLeft": 0,
          "statusType": "full",
          "statusText": "Full",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 6,
            "className": "6–7 Years",
            "time": "12:00 PM - 1:00 PM",
            "capacity": 20,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "7",
          "classId": 7,
          "time": "2:00 PM - 3:00 PM",
          "timeShort": "Saturday 2:00 PM - 3:00 PM",
          "day": "Saturday",
          "ageId": "8-9",
          "ageGroup": "8–9 Years · Advanced",
          "ageSimple": "8–9 Years",
          "level": "Advanced",
          "capacity": 19,
          "totalCapacity": 20,
          "spacesLeft": 1,
          "statusType": "few_left",
          "statusText": "Only 1 place left",
          "allowFreeTrial": true,
          "canBookTrial": true,
          "canBookMembership": true,
          "rawClass": {
            "classId": 7,
            "className": "8–9 Years",
            "time": "2:00 PM - 3:00 PM",
            "capacity": 19,
            "level": "Advanced",
            "totalCapacity": 20,
            "allowFreeTrial": true
          }
        },
        {
          "id": "8",
          "classId": 8,
          "time": "4:00 PM - 5:00 PM",
          "timeShort": "Saturday 4:00 PM - 5:00 PM",
          "day": "Saturday",
          "ageId": "10-12",
          "ageGroup": "10–11 Years · Pro",
          "ageSimple": "10–11 Years",
          "level": "Pro",
          "capacity": 20,
          "totalCapacity": 20,
          "spacesLeft": 0,
          "statusType": "full",
          "statusText": "Full",
          "allowFreeTrial": false,
          "canBookTrial": false,
          "canBookMembership": true,
          "rawClass": {
            "classId": 8,
            "className": "10–11 Years",
            "time": "4:00 PM - 5:00 PM",
            "capacity": 20,
            "level": "Pro",
            "totalCapacity": 20,
            "allowFreeTrial": false
          }
        }
      ]
    },
    "pricing": {
      "1": {
        "m12": "45.00",
        "m6": "50.00",
        "save": 120,
        "plans": {
          "p12": {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p6": {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          "p1": {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          }
        }
      },
      "2": {
        "m12": "40.83",
        "m6": "45.00",
        "save": 220,
        "plans": {
          "p12": {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      },
      "3": {
        "m12": "38.33",
        "m6": "42.22",
        "save": 300,
        "plans": {
          "p12": {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p6": {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          "p1": {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        }
      }
    },
    "starterPack": {
      "id": 1,
      "title": "Starter Pack",
      "price": "89.99",
      "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
      "paymentRouting": "head_office"
    },
    "starterPacks": [
      {
        "id": 1,
        "title": "Starter Pack",
        "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
        "price": 89.99,
        "paymentRouting": "head_office"
      }
    ],
    "terms": [
      {
        "id": "4",
        "name": "Autumn term",
        "day": "Saturday",
        "startDate": "2026-09-19",
        "endDate": "2026-10-31",
        "start": "2026-09-19",
        "end": "2026-10-31",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2026-09-19",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2026-09-26",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2026-10-03",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2026-10-10",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2026-10-17",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2026-10-24",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2026-10-31",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "5",
        "name": "Spring term",
        "day": "Saturday",
        "startDate": "2027-01-09",
        "endDate": "2027-02-20",
        "start": "2027-01-09",
        "end": "2027-02-20",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-01-09",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-01-16",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-01-23",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-01-30",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-02-06",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-02-13",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-02-20",
            "sessionPlanId": 7
          }
        ]
      },
      {
        "id": "6",
        "name": "Summer term",
        "day": "Saturday",
        "startDate": "2027-04-17",
        "endDate": "2027-05-29",
        "start": "2027-04-17",
        "end": "2027-05-29",
        "exclusionDates": [],
        "totalSessions": 7,
        "sessionsMap": [
          {
            "sessionDate": "2027-04-17",
            "sessionPlanId": 1
          },
          {
            "sessionDate": "2027-04-24",
            "sessionPlanId": 2
          },
          {
            "sessionDate": "2027-05-01",
            "sessionPlanId": 3
          },
          {
            "sessionDate": "2027-05-08",
            "sessionPlanId": 4
          },
          {
            "sessionDate": "2027-05-15",
            "sessionPlanId": 5
          },
          {
            "sessionDate": "2027-05-22",
            "sessionPlanId": 6
          },
          {
            "sessionDate": "2027-05-29",
            "sessionPlanId": 7
          }
        ]
      }
    ],
    "termGroups": [
      {
        "id": 3,
        "name": "Saturday 2026/2027 Season"
      }
    ],
    "paymentGroups": [
      {
        "id": 1,
        "name": "Weekly Football Classes",
        "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
        "createdAt": "2026-09-09T14:21:45.000Z",
        "updatedAt": "2026-09-09T09:40:56.000Z",
        "paymentPlans": [
          {
            "id": 1,
            "title": "1 Month Membership",
            "price": 55,
            "priceLesson": 13.75,
            "interval": "month",
            "duration": 1,
            "students": 1,
            "joiningFee": 25,
            "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
            "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 1,
              "payment_plan_id": 1,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 2,
            "title": "6 Month Membership",
            "price": 300,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 6,
            "students": 1,
            "joiningFee": 15,
            "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
            "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 2,
              "payment_plan_id": 2,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 3,
            "title": "12 Month Membership",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 12,
            "students": 1,
            "joiningFee": 0,
            "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
            "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T14:21:45.000Z",
            "updatedAt": "2026-09-09T09:40:56.000Z",
            "PaymentGroupHasPlan": {
              "id": 3,
              "payment_plan_id": 3,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z"
            }
          },
          {
            "id": 4,
            "title": "1 Month Membership (2 Students)",
            "price": 100,
            "priceLesson": 12.5,
            "interval": "month",
            "duration": 1,
            "students": 2,
            "joiningFee": 40,
            "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 4,
              "payment_plan_id": 4,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 5,
            "title": "6 Month Membership (2 Students)",
            "price": 540,
            "priceLesson": 11.25,
            "interval": "month",
            "duration": 6,
            "students": 2,
            "joiningFee": 25,
            "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 5,
              "payment_plan_id": 5,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 6,
            "title": "12 Month Membership (2 Students)",
            "price": 980,
            "priceLesson": 10.2,
            "interval": "month",
            "duration": 12,
            "students": 2,
            "joiningFee": 0,
            "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
            "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 6,
              "payment_plan_id": 6,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 7,
            "title": "1 Month Membership (3 Students)",
            "price": 140,
            "priceLesson": 11.66,
            "interval": "month",
            "duration": 1,
            "students": 3,
            "joiningFee": 50,
            "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
            "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 7,
              "payment_plan_id": 7,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 8,
            "title": "6 Month Membership (3 Students)",
            "price": 760,
            "priceLesson": 10.55,
            "interval": "month",
            "duration": 6,
            "students": 3,
            "joiningFee": 30,
            "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
            "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 8,
              "payment_plan_id": 8,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          },
          {
            "id": 9,
            "title": "12 Month Membership (3 Students)",
            "price": 1380,
            "priceLesson": 9.58,
            "interval": "month",
            "duration": 12,
            "students": 3,
            "joiningFee": 0,
            "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
            "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
            "createdAt": "2026-09-09T09:57:54.000Z",
            "updatedAt": "2026-09-09T09:57:54.000Z",
            "PaymentGroupHasPlan": {
              "id": 9,
              "payment_plan_id": 9,
              "payment_group_id": 1,
              "createdBy": 1,
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z"
            }
          }
        ]
      }
    ],
    "raw": {
      "venueId": 1,
      "venueName": "West London Sports Centre",
      "area": "West London",
      "address": "15 Commonwealth Way, Acton, London W3 7XX",
      "facility": "Indoor",
      "starterPack": true,
      "starterPacks": [
        {
          "id": 1,
          "title": "Starter Pack",
          "description": "Includes uniform, skills ball, Skills Tracker Book & Drawstring bag",
          "price": 89.99,
          "paymentRouting": "head_office"
        }
      ],
      "parkingNote": "ABC",
      "isCongested": false,
      "hasParking": true,
      "latitude": 51.5121,
      "longitude": -0.267572,
      "createdAt": "2026-09-09T11:25:14.000Z",
      "postal_code": "W3",
      "distanceMiles": 10274,
      "createdBy": 1,
      "classes": {
        "saturday": [
          {
            "classId": 5,
            "className": "4–5 Years",
            "time": "10:00 AM - 11:00 AM",
            "capacity": 13,
            "level": "Beginner",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 6,
            "className": "6–7 Years",
            "time": "12:00 PM - 1:00 PM",
            "capacity": 20,
            "level": "Intermediate",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 7,
            "className": "8–9 Years",
            "time": "2:00 PM - 3:00 PM",
            "capacity": 19,
            "level": "Advanced",
            "totalCapacity": 20,
            "allowFreeTrial": true
          },
          {
            "classId": 8,
            "className": "10–11 Years",
            "time": "4:00 PM - 5:00 PM",
            "capacity": 20,
            "level": "Pro",
            "totalCapacity": 20,
            "allowFreeTrial": false
          }
        ]
      },
      "paymentGroups": [
        {
          "id": 1,
          "name": "Weekly Football Classes",
          "description": "Membership payment group for weekly football classes offering 1, 6, and 12 month payment options.",
          "createdAt": "2026-09-09T14:21:45.000Z",
          "updatedAt": "2026-09-09T09:40:56.000Z",
          "paymentPlans": [
            {
              "id": 1,
              "title": "1 Month Membership",
              "price": 55,
              "priceLesson": 13.75,
              "interval": "month",
              "duration": 1,
              "students": 1,
              "joiningFee": 25,
              "HolidayCampPackage": "1 Day Free Holiday Camp Pass + 10% Member Discount on all Holiday Camps",
              "termsAndCondition": "Monthly rolling subscription. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 1,
                "payment_plan_id": 1,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 2,
              "title": "6 Month Membership",
              "price": 300,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 6,
              "students": 1,
              "joiningFee": 15,
              "HolidayCampPackage": "3 Days Free Holiday Camp Pass + 15% Member Discount on all Holiday Camps",
              "termsAndCondition": "6 months upfront membership commitment. Renews every 6 months. Discounted lesson rate included.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 2,
                "payment_plan_id": 2,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 3,
              "title": "12 Month Membership",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 12,
              "students": 1,
              "joiningFee": 0,
              "HolidayCampPackage": "Full Week Free Holiday Camp Pass (5 Days) + 20% Member Discount on all Holiday Camps",
              "termsAndCondition": "12 months annual membership commitment. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T14:21:45.000Z",
              "updatedAt": "2026-09-09T09:40:56.000Z",
              "PaymentGroupHasPlan": {
                "id": 3,
                "payment_plan_id": 3,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T14:21:45.000Z",
                "updatedAt": "2026-09-09T09:40:56.000Z"
              }
            },
            {
              "id": 4,
              "title": "1 Month Membership (2 Students)",
              "price": 100,
              "priceLesson": 12.5,
              "interval": "month",
              "duration": 1,
              "students": 2,
              "joiningFee": 40,
              "HolidayCampPackage": "2 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 2 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 4,
                "payment_plan_id": 4,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 5,
              "title": "6 Month Membership (2 Students)",
              "price": 540,
              "priceLesson": 11.25,
              "interval": "month",
              "duration": 6,
              "students": 2,
              "joiningFee": 25,
              "HolidayCampPackage": "6 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 2 students. Renews every 6 months. Sibling discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 5,
                "payment_plan_id": 5,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 6,
              "title": "12 Month Membership (2 Students)",
              "price": 980,
              "priceLesson": 10.2,
              "interval": "month",
              "duration": 12,
              "students": 2,
              "joiningFee": 0,
              "HolidayCampPackage": "2 Full Week Free Holiday Camp Passes (1 full week per student) + 20% Member Discount",
              "termsAndCondition": "12 months annual membership for 2 students. Maximum sibling savings with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 6,
                "payment_plan_id": 6,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 7,
              "title": "1 Month Membership (3 Students)",
              "price": 140,
              "priceLesson": 11.66,
              "interval": "month",
              "duration": 1,
              "students": 3,
              "joiningFee": 50,
              "HolidayCampPackage": "3 Free Holiday Camp Passes (1 per student) + 10% Member Discount",
              "termsAndCondition": "Monthly rolling subscription for 3 students. Renews automatically on the 1st of every month.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 7,
                "payment_plan_id": 7,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 8,
              "title": "6 Month Membership (3 Students)",
              "price": 760,
              "priceLesson": 10.55,
              "interval": "month",
              "duration": 6,
              "students": 3,
              "joiningFee": 30,
              "HolidayCampPackage": "9 Free Holiday Camp Passes (3 per student) + 15% Member Discount",
              "termsAndCondition": "6 months upfront commitment for 3 students. Renews every 6 months. Family bundle discount included.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 8,
                "payment_plan_id": 8,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            },
            {
              "id": 9,
              "title": "12 Month Membership (3 Students)",
              "price": 1380,
              "priceLesson": 9.58,
              "interval": "month",
              "duration": 12,
              "students": 3,
              "joiningFee": 0,
              "HolidayCampPackage": "3 Full Week Free Holiday Camp Passes (1 full week per student) + 25% Member Discount",
              "termsAndCondition": "12 months annual family membership for 3 students. Best value per lesson with zero joining fee.",
              "createdAt": "2026-09-09T09:57:54.000Z",
              "updatedAt": "2026-09-09T09:57:54.000Z",
              "PaymentGroupHasPlan": {
                "id": 9,
                "payment_plan_id": 9,
                "payment_group_id": 1,
                "createdBy": 1,
                "createdAt": "2026-09-09T09:57:54.000Z",
                "updatedAt": "2026-09-09T09:57:54.000Z"
              }
            }
          ]
        }
      ],
      "termGroups": [
        {
          "id": 3,
          "name": "Saturday 2026/2027 Season"
        }
      ],
      "terms": [
        {
          "id": 4,
          "name": "Autumn",
          "day": "saturday",
          "startDate": "2026-09-19",
          "endDate": "2026-10-31",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2026-09-19",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2026-09-26",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2026-10-03",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2026-10-10",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2026-10-17",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2026-10-24",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2026-10-31",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 5,
          "name": "Spring",
          "day": "saturday",
          "startDate": "2027-01-09",
          "endDate": "2027-02-20",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-01-09",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-01-16",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-01-23",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-01-30",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-02-06",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-02-13",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-02-20",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        },
        {
          "id": 6,
          "name": "Summer",
          "day": "saturday",
          "startDate": "2027-04-17",
          "endDate": "2027-05-29",
          "termGroupId": 3,
          "exclusionDates": [],
          "totalSessions": 7,
          "sessionsMap": [
            {
              "sessionDate": "2027-04-17",
              "sessionPlanId": 1
            },
            {
              "sessionDate": "2027-04-24",
              "sessionPlanId": 2
            },
            {
              "sessionDate": "2027-05-01",
              "sessionPlanId": 3
            },
            {
              "sessionDate": "2027-05-08",
              "sessionPlanId": 4
            },
            {
              "sessionDate": "2027-05-15",
              "sessionPlanId": 5
            },
            {
              "sessionDate": "2027-05-22",
              "sessionPlanId": 6
            },
            {
              "sessionDate": "2027-05-29",
              "sessionPlanId": 7
            }
          ],
          "createdBy": 1
        }
      ]
    }
  }
];

export default VENUES_DATA;
