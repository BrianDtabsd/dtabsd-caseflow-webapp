// Temporary mock of AWS Predictions for development
export const Predictions = {
  interpret: async ({ text, type }: { text: string; type: string }) => {
    // Mock response
    return {
      text: 'AI-generated summary of the document...',
      textInterpretation: {
        keyPhrases: [
          { text: 'medical condition' },
          { text: 'treatment plan' },
          { text: 'return to work' }
        ],
        entities: [
          { type: 'VARIABLE', text: 'patient_name', score: 0.95 },
          { type: 'VARIABLE', text: 'diagnosis', score: 0.92 },
          { type: 'VARIABLE', text: 'treatment_date', score: 0.88 }
        ]
      }
    };
  }
}; 