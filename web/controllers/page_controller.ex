defmodule Ecommerceapp.PageController do
  use Ecommerceapp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
