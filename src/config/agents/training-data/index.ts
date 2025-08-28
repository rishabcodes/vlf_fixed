import { AgentTrainingData, AgentType } from '../types';
import { removalDefenseTraining } from './removal-defense';
import { generalIntakeTraining } from './general-intake';
import { classificationTraining } from './classification';
import { generalLegalTraining } from './general-legal';
// import { businessImmigrationTraining } from './business-immigration';
// import { affirmativeImmigrationTraining } from './affirmative-immigration';
// import { criminalDefenseTraining } from './criminal-defense';
// import { personalInjuryTraining } from './personal-injury';
// import { workersCompTraining } from './workers-comp';
// import { familyLawTraining } from './family-law';
// import { spanishLanguageTraining } from './spanish-language';
// import { emergencyTraining } from './emergency';
// import { paymentBillingTraining } from './payment-billing';

export const agentTrainingData: Record<AgentType, AgentTrainingData> = {
  [AgentType.CLASSIFICATION]: classificationTraining,
  [AgentType.GENERAL_LEGAL]: generalLegalTraining,
  [AgentType.GENERAL_INTAKE]: generalIntakeTraining,
  [AgentType.REMOVAL_DEFENSE]: removalDefenseTraining,
  [AgentType.BUSINESS_IMMIGRATION]: {
    agentType: AgentType.BUSINESS_IMMIGRATION,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.AFFIRMATIVE_IMMIGRATION]: {
    agentType: AgentType.AFFIRMATIVE_IMMIGRATION,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.CRIMINAL_DEFENSE]: {
    agentType: AgentType.CRIMINAL_DEFENSE,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.PERSONAL_INJURY]: {
    agentType: AgentType.PERSONAL_INJURY,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.WORKERS_COMP]: {
    agentType: AgentType.WORKERS_COMP,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.FAMILY_LAW]: {
    agentType: AgentType.FAMILY_LAW,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.SPANISH_LANGUAGE]: {
    agentType: AgentType.SPANISH_LANGUAGE,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.EMERGENCY_AFTER_HOURS]: {
    agentType: AgentType.EMERGENCY_AFTER_HOURS,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.PAYMENT_BILLING]: {
    agentType: AgentType.PAYMENT_BILLING,
    scenarios: [],
    knowledge: [],
    responses: [],
  },

  // Placeholder for agents that will be trained later
  [AgentType.DOCUMENT_COLLECTION]: {
    agentType: AgentType.DOCUMENT_COLLECTION,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.CASE_STATUS]: {
    agentType: AgentType.CASE_STATUS,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.ASYLUM]: {
    agentType: AgentType.ASYLUM,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.U_VISA_VAWA]: {
    agentType: AgentType.U_VISA_VAWA,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.TRAFFIC_TICKETS]: {
    agentType: AgentType.TRAFFIC_TICKETS,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
  [AgentType.BUSINESS_FORMATION]: {
    agentType: AgentType.BUSINESS_FORMATION,
    scenarios: [],
    knowledge: [],
    responses: [],
  },
};
