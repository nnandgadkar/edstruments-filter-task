# Dynamic Filter Component System - Edstruments Assessment

A robust, type-safe, and highly modular React application that implements a complex dynamic filtering system. Built as a technical assessment for the Frontend Developer role at Edstruments.

🔗 **[View Live Demo](https://edstruments-filter-task-ci9t.vercel.app/)**

## Tech Stack
 **React 18**: Core UI framework ( v18.2.0)
 **TypeScript**: End-to-end type safety and interface definitions
 **Vite**: Fast frontend build tool
 **Material UI (MUI)**: Accessible and responsive component library
 **Lucide React**: Clean and scalable SVG iconography
 **date-fns**: Robust date parsing and comparison logic

##  Core Features

 **Dynamic Filter Builder**: Users can add, update, and remove multiple filters seamlessly.
 **Smart Type Detection**: The system dynamically adapts operators and input components based on the selected data type (e.g., selecting a `date` field automatically renders a Range picker with `Between` logic).
 **Advanced Client-Side Filtering**: 
  * Implements `AND` logic across different fields.
  * Implements `OR` logic for multiple filters applied to the *same* field.
  * Deep object traversal (e.g., filtering by `address.city`).
  * Array filtering operations (e.g., `in`, `notIn`, `containsAll`).
 **Performance Optimized**: Uses `useMemo` to ensure the filtering algorithm only re-runs when filter conditions or underlying data change, preventing unnecessary UI re-renders.
 **Filter Persistence**: Automatically saves active filters to `localStorage` to maintain user state across page reloads.
 **CSV Export**: Allows users to download the currently filtered dataset directly to a CSV file.

##  Architectural Decisions

To ensure maximum scalability and separation of concerns, the system is strictly Configuration-Driven. 

Instead of hardcoding dropdowns or inputs in the UI components, the system is powered by `src/utils/fieldConfig.ts`. 
The filtering engine (`src/utils/filterLogic.ts`) acts as a pure function, entirely decoupled from the UI layer. Integrating this filter system into a completely different table or dashboard requires zero changes to the core logic.


#Component Usage Example 
Because the architecture is modular and configuration-driven, adding a new filterable column to the table is incredibly simple. You do not need to touch the UI components or the filtering engine.

Step 1: Define the new field in src/utils/fieldConfig.ts:

TypeScript
import { FieldDefinition } from '../types/filtertypes';

export const AVAILABLE_FIELDS: FieldDefinition[] = [
  // ... existing fields
  { 
    id: 'yearsOfExperience', 
    label: 'Years of Experience', 
    type: 'number' 
  }
];

Step 2: The FilterRow component will automatically pick up this new field, map it to the correct number operators (>, <, =, between), and the DynamicInput component will automatically render the correct numeric input fields. No UI updates required!




##  Local Setup Instructions
 **Clone the repository**
  git clone https://github.com/nnandgadkar/edstruments-filter-task.git
   cd edstruments-filter-task
 
 **Install Dependencies**
 npm install or npm i

 **Run Development Server**
 npm run dev

 **View the Application**
 open http://localhost:5173/