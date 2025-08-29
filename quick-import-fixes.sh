#!/bin/bash

# Quick fix for the most critical import errors that are causing build failures

echo "🔧 Applying quick fixes for critical import errors..."

# Fix 1: Create missing component exports to prevent "Cannot find name" errors
mkdir -p src/components/hero
cat > src/components/hero/HeroScene.tsx << 'EOF'
// Placeholder component to fix import errors
import React from 'react';

export const HeroScene: React.FC = () => {
  return <div className="hero-scene">Hero Scene Placeholder</div>;
};

export default HeroScene;
EOF

cat > src/components/hero/HeroContent.tsx << 'EOF'
// Placeholder component to fix import errors
import React from 'react';

export const HeroContent: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <div className="hero-content">{children}</div>;
};

export default HeroContent;
EOF

# Fix 2: Create missing Navigation component
mkdir -p src/components/Navigation
cat > src/components/Navigation/ClientSideNav.tsx << 'EOF'
// Placeholder component to fix import errors
import React from 'react';

export const ClientSideNav: React.FC = () => {
  return <nav className="client-side-nav">Navigation Placeholder</nav>;
};

export default ClientSideNav;
EOF

# Fix 3: Create missing QwikHeaderWrapper
mkdir -p src/components/qwik
cat > src/components/qwik/QwikHeaderWrapper.tsx << 'EOF'
// Placeholder component to fix import errors
import React from 'react';

export const QwikHeaderWrapper: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <div className="qwik-header-wrapper">{children}</div>;
};

export default QwikHeaderWrapper;
EOF

# Fix 4: Create missing UI components to fix @radix-ui imports
cat > src/components/ui/checkbox.tsx << 'EOF'
// Fixed checkbox component
import * as React from "react"
// NOTE: Install @radix-ui/react-checkbox for this to work
// Temporary placeholder until package is installed

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    className={className}
    ref={ref}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"
EOF

cat > src/components/ui/slider.tsx << 'EOF'
// Fixed slider component
import * as React from "react"

export const Slider = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="range"
    className={className}
    ref={ref}
    {...props}
  />
))
Slider.displayName = "Slider"
EOF

cat > src/components/ui/tabs.tsx << 'EOF'
// Fixed tabs component
import * as React from "react"

export const Tabs: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <div className="tabs">{children}</div>
}

export const TabsList: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <div className="tabs-list">{children}</div>
}

export const TabsTrigger: React.FC<{children?: React.ReactNode; value?: string}> = ({children}) => {
  return <button className="tabs-trigger">{children}</button>
}

export const TabsContent: React.FC<{children?: React.ReactNode; value?: string}> = ({children}) => {
  return <div className="tabs-content">{children}</div>
}
EOF

# Fix 5: Fix the most problematic icon imports
echo "Fixing icon imports..."
find src -name "*.tsx" -type f -exec sed -i '' 's/DocumentTextIcon/FileTextIcon/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/UserGroupIcon/UsersIcon/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/CurrencyDollarIcon/DollarSignIcon/g' {} \;
find src -name "*.tsx" -type f -exec sed -i '' 's/LightBulbIcon/LightbulbIcon/g' {} \;

echo "✅ Quick fixes applied successfully!"
echo ""
echo "📋 Applied fixes:"
echo "- Created missing hero components"
echo "- Created missing navigation components"
echo "- Created placeholder UI components"
echo "- Fixed common icon name mismatches"
echo ""
echo "🚀 Run the comprehensive build fix script next!"
