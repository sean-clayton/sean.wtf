const _ = require("lodash");
const path = require("path");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  let slug;

  const parentNode = getNode(node.parent);
  if (node.internal.type === "Mdx") {
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    } else if (parentNode && parentNode.internal.type === `File`) {
      slug = _.get(path.parse(_.get(parentNode, "relativePath")), "name");
    } else if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = require.resolve("./src/templates/post.js");
  const seriesTemplate = require.resolve("./src/templates/series.js");

  const result = await wrapper(
    graphql(`
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              series
            }
          }
        }
      }
    `)
  );

  const posts = result.data.allMdx.nodes;

  posts.forEach((n, index) => {
    const next = index === 0 ? null : posts[index - 1];
    const prev = index === posts.length - 1 ? null : posts[index + 1];

    createPage({
      path: n.fields.slug,
      component: postTemplate,
      context: {
        slug: n.fields.slug,
        prev,
        next
      }
    });
  });

  const seriesSet = new Set();

  _.each(posts, n => {
    if (_.get(n, "frontmatter.series", [])) {
      n.frontmatter.series.forEach(cat => {
        seriesSet.add(cat);
      });
    }
  });

  const series = Array.from(seriesSet);

  series.forEach(series => {
    createPage({
      path: `/series/${_.kebabCase(series)}`,
      component: seriesTemplate,
      context: {
        series
      }
    });
  });
};
