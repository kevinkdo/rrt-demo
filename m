# Primitive bash build system

echo Building JSX
babel --plugins transform-react-jsx rrt_demo.jsx > rrt_demo.js

echo Post-processing rrt_demo.html
grep -vwE "browser.min.js|rrt_demo.jsx" rrt_demo.html > temp
sed -e 's#<!--<script src="rrt_demo.js"></script>-->#<script src="rrt_demo.js"></script>#g' temp > rrt_demo_prod.html
rm temp

echo Done building targets: rrt_demo_prod.html, rrt_demo.js
