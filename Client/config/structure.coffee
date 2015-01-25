# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Featured"
      id: "featured"
      location: "featured#index"
    }
    {
      title: "Index"
      id: "index"
      location: "example#getting-started" # Supersonic module#view type navigation
    }
    {
      title: "Settings"
      id: "settings"
      location: "example#settings"
    }
    {
      title: "Account"
      id: "account"
      location: "account#index"
    }
    {
      title: "Cart"
      id: "cart"
      location: "cart#index"
    }
  ]

  # rootView:
  #   location: "example#getting-started"

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
    {
      id: "featured-detail"
      location: "featured#detail"
    }
    {
      id: "modal-signin"
      location: "account#modal-signin"
    }
    {
      id: "modal-signup"
      location: "account#modal-signup"
    }
  ]

  drawers:
    right:
      id: "leftDrawer"
      location: "example#drawer"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"
  #
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
