# Neo-Terminal Portfolio Documentation

## Table of Contents

1. [Getting Started](../README.md)
2. [AWS Deployment Guide](./AWS_DEPLOYMENT.md)
3. [Development Guide](#development-guide)
4. [Architecture](#architecture)
5. [Customization](#customization)

## Development Guide

### Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and configs
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add `page.tsx` for the route
3. Optionally add `layout.tsx` for page-specific layout
4. Update navigation in `src/lib/config.ts`

### Component Guidelines

- Use TypeScript for all components
- Follow the terminal aesthetic with consistent styling
- Use Tailwind CSS utility classes
- Keep components small and focused
- Export types for component props

### Styling Conventions

- Dark theme is default
- Use terminal color palette from `tailwind.config.ts`
- Animations should be subtle and purposeful
- Maintain consistent spacing and typography

## Architecture

### Static Site Generation

The project uses Next.js static export for optimal performance:
- All pages are pre-rendered at build time
- No server-side rendering needed
- Deployable to any static hosting (AWS S3, Vercel, etc.)

### State Management

- Use React hooks for component state
- Context API for global state (theme, etc.)
- No external state management library needed for MVP

### Data Flow

```
Content (MDX/JSON) → Build Time → Static HTML → S3 → CloudFront → User
```

## Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  terminal: {
    bg: "#your-color",
    cyan: "#your-color",
    // ...
  }
}
```

### Adding Fonts

1. Import from Google Fonts in `layout.tsx`
2. Update `tailwind.config.ts` font family
3. Apply to body in `globals.css`

### Modifying Animations

Edit keyframes in `tailwind.config.ts`:

```typescript
keyframes: {
  'your-animation': {
    '0%': { /* start state */ },
    '100%': { /* end state */ }
  }
}
```

## Performance Optimization

### Images

- Use Next.js Image component
- Store optimized images in S3
- Serve via CloudFront CDN

### Code Splitting

- Next.js automatically code-splits by route
- Use dynamic imports for heavy components

### Caching

- Static assets: 1 year cache
- HTML files: No cache (must-revalidate)
- CloudFront handles caching logic

## Security

### Best Practices

- No API keys in client-side code
- Use environment variables for secrets
- Store in AWS Systems Manager Parameter Store
- Enable CloudFront security headers
- Use Content Security Policy (CSP)

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

## Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Responsive on mobile
- [ ] Dark/light mode toggle
- [ ] Links are not broken
- [ ] SEO meta tags present

### Performance Testing

```bash
# Build and analyze
npm run build

# Check bundle size
# Review .next/analyze output

# Test with Lighthouse
# Use Chrome DevTools
```

## Deployment Checklist

Before deploying to production:

- [ ] Update site metadata
- [ ] Add real content
- [ ] Configure environment variables
- [ ] Test all forms
- [ ] Verify SSL certificate
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Test from multiple devices
- [ ] Verify DNS settings
- [ ] Check robots.txt and sitemap

## Troubleshooting

### Build Failures

1. Clear `.next` directory
2. Delete `node_modules`
3. Run `npm install`
4. Run `npm run build`

### Styling Issues

1. Check Tailwind classes are spelled correctly
2. Verify PostCSS configuration
3. Clear browser cache
4. Check browser console for errors

### Deployment Issues

See [AWS Deployment Guide](./AWS_DEPLOYMENT.md#troubleshooting)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

---

**Need help?** Open an issue on GitHub or contact the maintainer.
