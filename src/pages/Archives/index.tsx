import { Timeline } from "antd"

import "./index.scss"
import PageTitle from "../../components/PageTitle"
import Card from "../../components/Card"

export default function Archives() {
  return (
    <div className="page-main">

      <div className="page-main-title">
        <PageTitle title="Archives"/>
      </div>

      <div className="page-main-content">
        <Card
        className="card"
        >
          <div className="time-line-block">
            <Timeline 
            mode="alternate"
            items={[
              {
                children:"test",
              },
              {
                children:"321",
              },
            ]}
            />
          </div>
        </Card>
      </div>

    </div>
  )
}