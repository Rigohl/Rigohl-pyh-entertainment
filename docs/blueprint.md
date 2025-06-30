# **App Name**: DualMuse

## Core Features:

- Split Hero Homepage: Homepage with a split hero section: one side for 'emotional songs' (pastel pink/mint background) and the other for 'corridos bélicos' (black/red background). Includes prominent buttons for Forms, Examples, Process, and Payment Test.
- Audio Sample Gallery: Example gallery displaying a curated collection of audio samples with associated descriptions to showcase song quality and style.
- Process Infographic: Step-by-step process infographic that clearly explains the song creation process: Form Submission -> AI Generation -> Payment -> Delivery.
- Customizable Forms: Customizable song request forms. A basic form captures essential details, while an advanced form allows for detailed customization of the song's theme, style, and message.
- AI-Powered Song Generation: AI-Powered Song Generation Tool: Integrated APIs for Suno and Boomy create both lyrics and audio, enhancing the uniqueness and personalization of each song. The LLM determines if keywords, requests, or references from the client would fit the generated song, and conditionally incorporates the suggestions if they fit the song structure.
- Payment Options: Payment model selection interface. Integrates a React Hook Form with Zod for validation and a payment model selector (1hr, 3hr, 6hr).

## Style Guidelines:

- Primary color: Pastel pink (#F8BBD0) and mint (#B2DFDB) to represent the 'emotional songs' side. The pink should act as the primary color and mint as a secondary highlight for interactive elements in that section.
- Secondary color: Carbon black (#212121) and vibrant red (#D32F2F) to represent the 'corridos bélicos' side. The black should act as the primary color and red as a secondary highlight for interactive elements in that section.
- Accent color: Golden (#FFD54F) for call-to-action buttons and elements needing emphasis across the platform.
- Headline font: 'Playfair' (serif) for titles, lending an elegant touch.
- Body font: 'Inter' (sans-serif) for a modern and readable text experience.
- Label font: 'Roboto Mono' (monospace) for form labels, providing a clear and functional appearance.
- Implement subtle CSS microinteractions for a smooth user experience, such as smooth transitions and a slight scale (1.05) on hover for interactive elements.