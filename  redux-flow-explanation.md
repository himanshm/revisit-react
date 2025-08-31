# Redux Flow Complete Guide

## Redux Flow Overview

Redux follows a **unidirectional data flow** with these core concepts:

Action → Dispatch → Reducer → State → UI

## 1. Action (What Happened?)

**Actions** are plain JavaScript objects that describe what happened in your application.

### Action Structure:

```javascript
{
  type: 'SNACKBAR_OPEN',           // Required: What type of action
  data: {                          // Optional: Additional data
    message: 'Invoice approved',
    type: 'success',
    alertTitle: 'Success'
  }
}
```

### Action Creators (Functions that create actions):

```javascript
export const successMessage = (message) => (dispatch) => {
  dispatch({
    type: "SNACKBAR_OPEN",
    data: {
      message,
      type: "success",
      alertTitle: "Success",
    },
  });
};
```

## 2. Dispatch (Send the Action)

**Dispatch** is Redux's way of sending actions to the store. It's the only way to trigger state changes.

```javascript
// ❌ This doesn't work - action never reaches Redux
successMessage("Invoice approved");

// ✅ This works - action gets dispatched to Redux
dispatch(successMessage("Invoice approved"));
```

## 3. Reducer (How to Update State)

**Reducers** are pure functions that take the current state and an action, then return the new state.

### Reducer Structure:

```javascript
const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SNACKBAR_OPEN":
      return {
        ...state,
        isOpen: true,
        message: action.data.message,
        type: action.data.type,
        alertTitle: action.data.alertTitle,
      };

    case "SNACKBAR_CLEAR":
      return {
        ...state,
        isOpen: false,
        message: "",
        type: "",
        alertTitle: "",
      };

    default:
      return state; // Always return current state for unknown actions
  }
};
```

## 4. State (Application Data)

**State** is the single source of truth for your application data.

```javascript
const state = {
  snackbar: {
    isOpen: true,
    message: 'Invoice approved',
    type: 'success',
    alertTitle: 'Success'
  },
  invoices: {
    loading: false,
    data: [...],
    error: null
  }
};
```

## 5. UI (React Components)

**UI components** read from state and re-render when state changes.

```javascript
const SnackbarComponent = ({ snackbar, dispatch }) => {
  if (!snackbar.isOpen) return null;

  return (
    <div className={`snackbar ${snackbar.type}`}>
      <h4>{snackbar.alertTitle}</h4>
      <p>{snackbar.message}</p>
      <button onClick={() => dispatch(clearSnackbar())}>Close</button>
    </div>
  );
};
```

## Complete Flow Example

### Step 1: User clicks "Approve Invoice"

```javascript
<button onClick={() => dispatch(approveInvoice(id, status, data))}>
  Approve
</button>
```

### Step 2: Action Creator is called

```javascript
export function approveInvoice(id, type, data, callback) {
  return (dispatch) => {
    dispatch({ type: "APPROVE" }); // Loading state

    return dispatch(makeAPIRequest(api, id, data)).then(() => {
      dispatch({ type: "APPROVE_SUCCESS" }); // Success state
      dispatch(showAlertPopup("success", "Invoice approved")); // UI feedback
      dispatch(getInvoiceOverviewDetails(id)); // Refresh data
    });
  };
}
```

### Step 3: Actions flow through Redux

```javascript
// Action 1: APPROVE
{ type: 'APPROVE' }

// Action 2: APPROVE_SUCCESS
{ type: 'APPROVE_SUCCESS' }

// Action 3: SNACKBAR_OPEN
{
  type: 'SNACKBAR_OPEN',
  data: {
    message: 'Invoice approved',
    type: 'success',
    alertTitle: 'Success'
  }
}
```

### Step 4: Reducers update state

```javascript
// Invoice reducer
case 'APPROVE':
  return { ...state, approveButtonLoader: true };

case 'APPROVE_SUCCESS':
  return { ...state, approveButtonLoader: false };

// Snackbar reducer
case 'SNACKBAR_OPEN':
  return {
    ...state,
    isOpen: true,
    message: action.data.message,
    type: action.data.type
  };
```

### Step 5: UI re-renders

```javascript
// Button shows loading state
<button disabled={approveButtonLoader}>
  {approveButtonLoader ? 'Approving...' : 'Approve'}
</button>

// Snackbar appears
<Snackbar
  isOpen={snackbar.isOpen}
  message={snackbar.message}
  type={snackbar.type}
/>
```

## Key Redux Principles

1. **Single Source of Truth** - All application state is stored in one place
2. **State is Read-Only** - Only way to change state is by dispatching actions
3. **Changes are Made with Pure Functions** - Reducers are pure functions
4. **Unidirectional Data Flow** - Action → Dispatch → Reducer → State → UI

## Common Patterns

### Async Actions (Thunks)

```javascript
export function approveInvoice(id, type, data) {
  return (dispatch) => {
    dispatch({ type: "APPROVE" }); // Loading state

    return makeAPIRequest(api, id, data).then(() => {
      dispatch({ type: "APPROVE_SUCCESS" }); // Success state
      dispatch(showAlertPopup("success", "Approved")); // UI feedback
    });
  };
}
```

### Action Types as Constants

```javascript
// constants.js
export const APPROVE = 'INVOICES/APPROVE';
export const APPROVE_SUCCESS = 'INVOICES/APPROVE_SUCCESS';

// actions.js
dispatch({ type: APPROVE });

// reducer.js
case APPROVE:
  return { ...state, loading: true };
```

### Immutable State Updates

```javascript
// Using spread operator
return { ...state, loading: true };

// Using Immutable.js
return state.merge({ loading: true });

// Using Immer
return produce(state, (draft) => {
  draft.loading = true;
});
```

```

```
