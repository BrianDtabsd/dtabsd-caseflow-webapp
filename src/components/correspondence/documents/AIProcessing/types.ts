export interface KeyInfo {
  type: string;
  text: string;
  confidence: number;
}

export interface ProcessingResult {
  summary?: string;
  categories: string[];
  keyInfo: KeyInfo[];
  timestamp: Date;
  documentId: string;
}

export type DocumentType = 'medical' | 'correspondence' | 'form';

export interface AIProcessingConfig {
  enableMedicalAnalysis: boolean;
  enableClassification: boolean;
  enableKeyExtraction: boolean;
  confidenceThreshold: number;
} 