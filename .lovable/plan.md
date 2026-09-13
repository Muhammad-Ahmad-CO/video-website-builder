# Scroll-driven voxel header

## What will change
- Replace “Michael Brown” with “Muhammad Ahmad” throughout the portfolio’s visible identity and page metadata.
- Add a large 3D voxel rendering of “Muhammad Ahmad” to the opening section, while retaining the current supporting headline.
- Animate the voxel lettering along a curved path in response to page scroll, with subtle letter rotation and depth.

## Visual direction
- Build sharp, block-based letters from small cubes rather than smooth extruded type.
- Use the existing espresso and parchment palette, typography, spacing, and editorial composition.
- Keep the name immediately recognizable and preserve the existing photography as a complementary layer.

## Performance and accessibility
- Render all cubes as one instanced mesh to minimize draw calls.
- Load the 3D code only in the browser, cap rendering resolution, avoid shadows and post-processing, and stop continuous rendering when idle.
- Disable movement for reduced-motion preferences and retain accessible HTML text for screen readers and search engines.
- Adapt the composition for mobile and desktop without overlapping navigation or supporting text.

## Verification
- Check the opening section at desktop and mobile sizes.
- Verify scroll movement, text readability, reduced-motion behavior, clean console output, and a successful project build.
