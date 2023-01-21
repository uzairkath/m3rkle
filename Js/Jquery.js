/* <![CDATA[ */
var scriptData = {
  jvcf7_default_settings: {
    jvcf7_show_label_error: "errorMsgshow",
    jvcf7_invalid_field_design: "theme_0",
  },
};
/* ]]> */

/* <![CDATA[ */
/* ]]> */
/* <![CDATA[ */
var sgr = { sgr_site_key: "" };
/* ]]> */
/* <![CDATA[ */
var uacf7_cf_object = {
  168: [
    {
      uacf7_cf_hs: "show",
      uacf7_cf_group: "conditional-748",
      uacf_cf_condition_for: "any",
      uacf7_cf_conditions: {
        uacf7_cf_tn: ["radio-789"],
        uacf7_cf_operator: ["equal"],
        uacf7_cf_val: ["Yes"],
      },
    },
    {
      uacf7_cf_hs: "show",
      uacf7_cf_group: "conditional-898",
      uacf_cf_condition_for: "any",
      uacf7_cf_conditions: {
        uacf7_cf_tn: ["radio-790"],
        uacf7_cf_operator: ["equal"],
        uacf7_cf_val: ["Yes"],
      },
    },
    {
      uacf7_cf_hs: "show",
      uacf7_cf_group: "conditional-718",
      uacf_cf_condition_for: "any",
      uacf7_cf_conditions: {
        uacf7_cf_tn: ["radio-792"],
        uacf7_cf_operator: ["equal"],
        uacf7_cf_val: ["Yes"],
      },
    },
  ],
};

jQuery(document).ready(oxygen_init_burger);
function oxygen_init_burger($) {
  $(".oxy-burger-trigger").each(function (i, OxyBurgerTrigger) {
    let touchEventOption = $(OxyBurgerTrigger)
      .children(".hamburger")
      .data("touch");
    let touchEvent = "ontouchstart" in window ? touchEventOption : "click";

    // Close hamburger when element clicked
    $(OxyBurgerTrigger).on(touchEvent, function (e) {
      e.stopPropagation();

      // Check user wants animations
      if ($(this).children(".hamburger").data("animation") !== "disable") {
        $(this).children(".hamburger").toggleClass("is-active");
      }
    });
  });

  // For listening for modals closing to close the hamburger
  var className = "live";
  var target = document.querySelectorAll(
    ".oxy-modal-backdrop[data-trigger='user_clicks_element']"
  );
  for (var i = 0; i < target.length; i++) {
    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // When the style changes on modal backdrop
        if (mutation.attributeName === "style") {
          // If the modal is live and is closing
          if (!mutation.target.classList.contains(className)) {
            // Close the toggle
            closeToggle(mutation.target);
          }
        }
      });
    });

    // configuration of the observer
    var config = {
      attributes: true,
      attributeFilter: ["style"],
      subtree: false,
    };

    // pass in the target node, as well as the observer options
    observer.observe(target[i], config);
  }

  // Helper function to close hamburger if modal closed.
  function closeToggle(elem) {
    var triggerSelector = $($(elem).data("trigger-selector"));

    // Abort if burger not being used as the trigger or animations not turned on
    if (
      !triggerSelector.hasClass("oxy-burger-trigger") ||
      triggerSelector.children(".hamburger").data("animation") === "disable"
    ) {
      return;
    }
    // Close that particular burger
    triggerSelector.children(".hamburger").removeClass("is-active");
  }

  jQuery(document).ready(function () {
    jQuery("body").on("click", ".oxy-menu-toggle", function () {
      jQuery(this).parent(".oxy-nav-menu").toggleClass("oxy-nav-menu-open");
      jQuery("body").toggleClass("oxy-nav-menu-prevent-overflow");
      jQuery("html").toggleClass("oxy-nav-menu-prevent-overflow");
    });
    var selector = '.oxy-nav-menu-open .menu-item a[href*="#"]';
    jQuery("body").on("click", selector, function () {
      jQuery(".oxy-nav-menu-open").removeClass("oxy-nav-menu-open");
      jQuery("body").removeClass("oxy-nav-menu-prevent-overflow");
      jQuery("html").removeClass("oxy-nav-menu-prevent-overflow");
      jQuery(this).click();
    });
  });
}

jQuery(document).ready(function () {
  var selector = "#_header-1-13",
    scrollval = parseInt("300");
  if (!scrollval || scrollval < 1) {
    jQuery("body").css("margin-top", jQuery(selector).outerHeight());
    jQuery(selector).addClass("oxy-sticky-header-active");
  } else {
    var scrollTopOld = 0;
    jQuery(window).scroll(function () {
      if (!jQuery("body").hasClass("oxy-nav-menu-prevent-overflow")) {
        if (jQuery(this).scrollTop() > scrollval) {
          if (!jQuery(selector).hasClass("oxy-sticky-header-active")) {
            if (jQuery(selector).css("position") != "absolute") {
              jQuery("body").css("margin-top", jQuery(selector).outerHeight());
            }
            jQuery(selector).addClass("oxy-sticky-header-active");
          }
        } else {
          jQuery(selector)
            .removeClass("oxy-sticky-header-fade-in")
            .removeClass("oxy-sticky-header-active");
          if (jQuery(selector).css("position") != "absolute") {
            jQuery("body").css("margin-top", "");
          }
        }
        scrollTopOld = jQuery(this).scrollTop();
      }
    });
  }
});

jQuery("body").addClass("oxygen-aos-enabled");

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-E805K83M0E");
