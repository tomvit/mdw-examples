curl -s -X POST --header "Content-Type: text/xml;charset=UTF-8" \
--header "SOAPAction: \"evaluate\"" --data @evaluate-input.xml \
http://mdw-infra.fit.cvut.cz/soa-infra/services/mdw-examples/Evaluate/evaluate_client_ep | xmllint --format -
