### npx create-nx-workspace@latest org-bion --preset=angular-monorepo --packageManager=pnpm --nx-cloud=skip

### pnpm add -D @nrwl/angular

### nx g @nrwl/angular:application --name=website --directory=apps/website --e2eTestRunner=none

### nx g @nrwl/angular:library --name=ui --directory=packages/ui

### nx g @nrwl/angular:library --name=core --directory=packages/core

### nx g @nrwl/angular:component button
