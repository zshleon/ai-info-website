# Cloud Firestore / Database Schema

To eliminate the "translation gap" and properly fuel the `UsagePoolVisualizer`, our Firestore documents will adhere to this structure:

## `products` Collection
Each document represents an AI product tier (e.g. `claude-pro`, `chatgpt-plus`).

```typescript
interface AIProduct {
  id: string; // Document ID (e.g., 'claude-pro')
  name: string; // 'Claude Pro'
  brand_id: string; // 'anthropic'
  price_monthly: number;
  
  // The crucial quota configuration
  shared_usage_pool: boolean; // Determines visualizer path (Radial vs Linear)
  
  limits: {
    cli_limit_description: string; // e.g., "Shares token-bucket with web"
    coding_tokens_per_month: number; // For strictly independent batteries
    chat_context_window: string; // e.g., "200k tokens"
    daily_message_cap_description: string;
  };
  
  features: {
    cli_access: boolean;
    ide_integration: boolean;
  };
}
```

## `reviews` Collection
Aggregating the multi-dimensional community ratings.

```typescript
interface UserReview {
  id: string;
  product_id: string;      // foreign key -> products.id
  user_id: string;         // foreign key -> Firebase Auth UID
  timestamp: string;       // ISO 8601
  
  ratings: {
    coding_logic: number;           // 1.0 to 5.0
    conversational_naturalness: number;  
    speed: number;             
    reliability: number;            
  };
  
  // Text review with Prompt Injection Shield tracking
  comment_text: string;
  is_flagged_for_injection: boolean; 
}
```
