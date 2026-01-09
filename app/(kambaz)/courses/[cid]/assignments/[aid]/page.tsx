export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label><br/>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
            <select id="wd-group">
              <option value="Group1">Group 1</option>
              <option value="Group2">Group 2</option>
              <option value="Group3">Group 3</option>
              <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
            <select id="wd-display-grade-as">
              <option value="GPA">GPA</option>
              <option value="Decimal">Decimal</option>
              <option value="Fractional">Fractional</option>
              <option selected value="Percentage">Percentage</option>
            </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
            <select id="wd-submission-type">
              <option value="InPerson">In-Person</option>
              <option selected value="Online">Online</option>
            </select>

            <div>
                <br/><label>Online Entry Options</label><br/>
                <input type="checkbox" name="online-entry-choice" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>
                <input type="checkbox" name="online-entry-choice" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>
                <input type="checkbox" name="online-entry-choice" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                <input type="checkbox" name="online-entry-choice" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotations</label><br/>
                <input type="checkbox" name="online-entry-choice" id="wd-file-upload"/>
                <label htmlFor="wd-file-upload">File Uploads</label>
            </div>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
                <div>
                    <div>
                        <label htmlFor="wd-assign-to">Assign to</label><br/>
                        <input type="text"
                            defaultValue="Everyone"
                            title="Assign to"
                            id="wd-assign-to" /><br/>
                    </div>
                    <div>
                        <label htmlFor="wd-due-date">Due</label><br/>
                        <input type="date"
                        title="Due"
                        id="wd-due-date" /><br/>
                    </div>
                    <div>
                        <label htmlFor="wd-available-from">Available from</label><br/>
                        <input type="date"
                        title="Available from"
                        id="wd-available-from" /><br/>
                        
                        <label htmlFor="wd-available-until">Available until</label><br/>
                        <input type="date"
                        title="Available until"
                        id="wd-available-until" /><br/>
                    </div>

                </div>
            </td>
          </tr>
        </table>
        <hr/>
        <table width="100%">
            <tr>
                <td align="right">
                    <button type="button">Cancel</button>
                    <button type="button">Submit</button>
                </td>
            </tr>
        </table>
      </div>
  );}
  