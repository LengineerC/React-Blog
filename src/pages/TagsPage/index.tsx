import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import "./index.scss";

export default function TagsPage() {
  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Tags"/>
      </div>

      <div className="page-main-content">
        <Card>
          <div>
            tags
          </div>
        </Card>
      </div>

    </div>
  )
}