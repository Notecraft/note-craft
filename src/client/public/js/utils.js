/* eslint-disable no-undef */
/**
 * Sets the Url query parameters to a target elements value.
 *
 * @param {*} parameterName The query parameter key name.
 * @param {*} target The element target that will provide the value.
 */
const setUrl = (parameterName, target) => {
  var href = new URL(window.location.href);
  href.searchParams.set(parameterName, target.value);
  window.location.href = href;
};

/**
 * Genereates a URL with a list of query parameterss.
 *
 * @param {*} params The list of parameters to add on query parameters.
 *
 * @returns {string} The url with query parameters.
 */
const createSharableUrl = (params = []) => {
  var href = new URL(window.location.href);

  params.forEach((item) => {
    href.searchParams.set(item.name, item.value);
  });

  return href.href;
};

/**
 * Remove a query parameters from the url.
 *
 * @param {*} url The url to rmeove the query parameter from.
 * @param {*} parameter The parameter to remove.
 *
 * @returns {string} The url with the parameter removed.
 */
function removeUrlParameter(url, parameter) {
  var urlParts = url.split("?");

  if (urlParts.length >= 2) {
    var urlBase = urlParts.shift();
    var queryString = urlParts.join("?");
    var prefix = encodeURIComponent(parameter) + "=";
    var parts = queryString.split(/[&;]/g);

    for (var i = parts.length; i--; i > 0) {
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = urlBase + "?" + parts.join("&");
  }

  return url;
}

/**
 * Copies the given text string to the clipboard.
 *
 * @param {*} textToCopy The text to copy to the clipboard.
 */
function copyStringToClipboard(textToCopy) {
  var el = document.createElement("textarea");
  el.value = textToCopy;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px",
  };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export { setUrl, createSharableUrl, removeUrlParameter, copyStringToClipboard };
