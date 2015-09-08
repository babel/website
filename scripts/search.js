/* global jQuery */

(function ($) {
  'use strict';

  var algolia = algoliasearch('MXM0JWJNIW', 'ff7b0847d8705c279222272303e68527');
  var $searchInput = $('#babel-search-input');
  var suggestionTemplate = window.Hogan.compile($('#suggestion-item-template').html());
  var footerTemplate = window.Hogan.compile($('#suggestion-footer-template').html());

  function goToSuggestion(event, item) {
    $searchInput.autocomplete('val', '');
    window.location.href = item.url;
  }


   // Typeahead dataset source
  function datasetSource(query, callback) {
    algolia.search([{
      indexName: 'babeljs',
      query: query,
      params: {
        hitsPerPage: 5
      }
    }], function (err, data) {
      callback(formatHits(data.results[0].hits));
    });
  }

  function formatHits(hits) {
    // Flatten all values into one array, marking the first element with
    // `flagName`
    function flattenObject(o, flagName) {
      var values = _.map(_.values(o), function(value) {
        value[0][flagName] = true;
        return value;
      });
      return _.flatten(values);
    }

    // Group hits by category / subcategory
    var groupedHits = _.groupBy(hits, 'category');
    _.each(groupedHits, function(list, category) {
      var groupedHitsBySubCategory = _.groupBy(list, 'subcategory');
      var flattenedHits = flattenObject(groupedHitsBySubCategory, 'isSubcategoryHeader');
      groupedHits[category] = flattenedHits;
    });
    groupedHits = flattenObject(groupedHits, 'isCategoryHeader');

    // Translate hits into smaller objects to be send to the template
    return _.map(groupedHits, function(hit) {
      return {
        isCategoryHeader: hit.isCategoryHeader,
        isSubcategoryHeader: hit.isSubcategoryHeader,
        category: hit._highlightResult.category ? hit._highlightResult.category.value: hit.category,
        subcategory: hit._highlightResult.subcategory ? hit._highlightResult.subcategory.value : hit.category,
        title: hit._highlightResult.display_title ? hit._highlightResult.display_title.value : hit.display_title,
        text: hit._snippetResult ? hit._snippetResult.text.value : hit.text,
        url: hit.url
      };
    });
  }

  var dataset = {
    // Disable update of the input field when using keyboard
    displayKey: function () {
      return $searchInput.val();
    },
    source: datasetSource,
    templates: {
      suggestion: function(item) {
        return suggestionTemplate.render(item);
      },
      footer: function() {
        return footerTemplate.render();
      }
    }
  };

  $searchInput.autocomplete({
    hint: false,
    autoselect: true
  }, dataset)
    .on('autocomplete:selected', goToSuggestion);

  // Init autocomplete
  $(function () {
    // Toggle and focus the search bar when clicking on the magnifying glass on
    // small devices. This is achieved through a label and corresponding
    // checkbox.
    // This could have been done in complete HTML except that it does not work
    // on iOS (focus can only be triggered from user interaction), so we need to
    // replicate the behavior using javascript.
    var $toggleCheckbox = $('#babel-toggle-search');
    var $toggleLabels = $('.babel-toggle-search-open');
    $toggleLabels.on('click', function (e) {
      $toggleCheckbox.click();
      $searchInput.focus();
      e.preventDefault();
    });

    // Fixing some default typeahead CSS not playing nicely with the navbar
    var $autocompleteDropdown = $searchInput.nextAll('.aa-dropdown-menu');
    $autocompleteDropdown.css('top', $searchInput.outerHeight() + 'px');
  });
})(jQuery);

